const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

// GET /api/orders/cart
router.get('/cart', ordersCtrl.cart);
// GET /api/orders/history
router.get('/cart/history', ordersCtrl.cartHistory);
// POST /api/orders/cart/classes/:id
router.post('/cart/classes', ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);


module.exports = router;