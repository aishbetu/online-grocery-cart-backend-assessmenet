const express = require('express');

// local imports
const CartController = require('../controller/cart.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add/:prodId', auth, CartController.addToCart);

router.get('/', auth, CartController.getCart);

router.delete('/:prodId', auth, CartController.removeFromCart);

module.exports = router;
