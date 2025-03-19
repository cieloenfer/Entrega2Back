const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../products.json');
    }

    async getProducts() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async getProductById(id) {
        const products = await this.getProducts();
        return products.find(p => p.id === id) || null;
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const newProduct = { id: products.length + 1, ...product };
        products.push(newProduct);
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) return null;
        
        products[index] = { ...products[index], ...updatedFields, id };
        await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return products[index];
    }

    async deleteProduct(id) {
        let products = await this.getProducts();
        const filteredProducts = products.filter(p => p.id !== id);
        if (products.length === filteredProducts.length) return null;

        await fs.promises.writeFile(this.filePath, JSON.stringify(filteredProducts, null, 2));
        return id;
    }
}

module.exports = ProductManager;
