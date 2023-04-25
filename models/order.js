const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classSchema = require('./classSchema');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classes: [classSchema],
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.classes.reduce((total, klass) => (total + klass.price), 0);
});

orderSchema.virtual('totalQty').get(function() {
  return this.classes.length
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
orderSchema.methods.addItemToCart = async function(specClass) {
  const cart = this;
  let alreadyInCart = cart.classes.find(function(klass) {
    return klass._id.toString() === specClass._id
  })
  if (!alreadyInCart) {
    cart.classes.push(specClass);    
  }

  return cart.save();
}


module.exports = mongoose.model('Order', orderSchema);