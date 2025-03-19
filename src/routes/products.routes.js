const express = require('express');
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

module.exports = (io) => {
    const router = express.Router();

    // Obtener todos los productos
    router.get('/', async (req, res) => {
        const products = await productManager.getProducts();
        res.json(products);
    });

    // Agregar un nuevo producto
    router.post('/', async (req, res) => {
        const product = await productManager.addProduct(req.body);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products); // Emitir actualización
        res.json(product);
    });

    // Eliminar un producto
    router.delete('/:pid', async (req, res) => {
        await productManager.deleteProduct(parseInt(req.params.pid));
        const products = await productManager.getProducts();
        io.emit('updateProducts', products); // Emitir actualización
        res.json({ message: 'Producto eliminado' });
    });

    return router;
};

