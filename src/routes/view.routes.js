const express = require('express');
const ProductManager = require('../managers/productManager');

const router = express.Router();
const productManager = new ProductManager();

// Vista estática de productos
router.get('/home', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

// Vista de productos en tiempo real con WebSockets
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
