const Order = require('../../models/order');
const Class = require('../../models/class');

module.exports = {
  cart,
  addToCart,
  checkout,
  cartHistory,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

// Add an item to the cart
async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        await cart.addItemToCart(req.body);
        res.json(cart);        
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    let ids = cart.classes.map((klass) => klass._id.toString())
    console.log(ids)
    let boughtClasses = await Class.find({_id: {$in: [...ids]}}).exec()
    console.log(boughtClasses)
    boughtClasses.forEach((klass) => {
        klass.isPaid = true;
        klass.buyer = req.user._id;
        klass.save()
        }
    )
    cart.classes.forEach(function(klass){
      klass.isPaid = true;
      klass.buyer = req.user._id;
      klass.save()
    })
    await cart.save();
    res.json(cart);
}

async function cartHistory(req, res) {
  const cartHistory = await Order.getHistory(req.user._id)
  res.json(cartHistory)
}