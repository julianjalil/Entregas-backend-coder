import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager();

// Obtener lista de productos
productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        res.json(limit ? products.slice(0, parseInt(limit)) : products);
    } catch (error) {
        console.error(`Error al obtener los productos: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

// Obtener producto por su ID
productsRouter.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductsById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(`Error al obtener el producto: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

// Crear nuevo producto
productsRouter.post("/", async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;
        const product = await productManager.addProduct(title, description, price, code, stock, category, thumbnails);
        res.status(201).json(product);
    } catch (error) {
        console.error(`Error al agregar el producto: ${error}`);
        res.status(400).json({ error: error.message });
    }
});

// Actualizar producto por ID
productsRouter.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedFields = req.body;
        const product = await productManager.updateProduct(productId, updatedFields);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(`Error al actualizar el producto: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

// Eliminar producto por ID
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const success = await productManager.deleteProduct(productId);
        
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

export default productsRouter;