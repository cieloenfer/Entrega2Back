const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');

const ProductManager = require('./managers/productManager');
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.routes');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productManager = new ProductManager();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productsRouter(io)); // Pasamos io al router
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSockets
io.on('connection', async (socket) => {
    console.log('Usuario conectado');

    // Enviar productos al conectar
    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar Servidor
const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
