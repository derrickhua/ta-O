const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = require('./classSchema');

const lineClassSchema = new Schema({
  class: classSchema
}, {
    toJSON: { virtuals: true }
});

lineClassSchema.virtual('price').get(function() {
    // 'this' is the embedded lineItem sub-document 
    return this.class.price
  });

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lineClasses: [lineClassSchema],
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineclasses.reduce((total, class) => total + class.price, 0);
});

orderSchema.virtual('totalQty').get(function() {
  return this.lineClasses.length
});

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

// Static methods are callable on the Model (Order)
orderSchema.statics.getCart = function(userId) {
  // 'this' is bound to the model (don't use an arrow function)
  // return the promise that resolves to a cart (the user's unpaid order)
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update - in the case the order (cart) is upserted
    { user: userId },
    // upsert option creates the doc if it doesn't exist!
    { upsert: true, new: true }
  );
};

orderSchema.statics.getHistory = function(userId) {
  return this.find(
    // query to find all previous orders
    {user: userId, isPaid: true}
    )
};

// Instance methods are callable on the document (instance)
orderSchema.methods.addItemToCart = async function(itemId) {
  const cart = this;
  // Check if the item already exists in the cart
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem) {
    lineItem.qty += 1;
  } else {
    const item = await mongoose.model('Item').findById(itemId);
    cart.lineItems.push({ item });
  }
  // return the promise that is returned by save()
  return cart.save();
}

// Instance method to set an item's qty in the cart (will add item if does not exist)
orderSchema.methods.setItemQty = function(itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
  if (lineItem && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineItems array
    lineItem.remove();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

// 


module.exports = mongoose.model('Order', orderSchema);