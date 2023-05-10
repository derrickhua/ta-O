const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');
const ensureLoggedIn = require('../../config/ensureLoggedIn');
// GET /api/orders/cart
router.get('/cart',ensureLoggedIn, ordersCtrl.cart);
// GET /api/orders/history
router.get('/cart/history',ensureLoggedIn, ordersCtrl.cartHistory);
// POST /api/orders/cart/classes/:id
router.post('/cart/classes',ensureLoggedIn, ordersCtrl.addToCart);
// POST /api/orders/cart/checkout
router.post('/cart/checkout',ensureLoggedIn, ordersCtrl.checkout);


module.exports = router;