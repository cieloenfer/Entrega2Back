const socket = io();

// Escuchar actualización de productos
socket.on('updateProducts', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.title} - $${product.price} <button onclick="deleteProduct(${product.id})">Eliminar</button>`;
        productList.appendChild(li);
    });
});

// Manejar formulario de productos
document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;

    fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price })
    });
});

// Función para eliminar productos
function deleteProduct(id) {
    fetch(`/api/products/${id}`, { method: 'DELETE' });
}
