const express = require('express');

//local imports
const ProductsController = require('../controller/products.controller');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, ProductsController.getProducts);

router.get('/:id', auth, ProductsController.getProduct);

router.post('/', auth, ProductsController.addProduct);

router.put('/:id', auth, ProductsController.updateProduct);

router.delete('/:id', auth, ProductsController.deleteProduct);


module.exports = router;
