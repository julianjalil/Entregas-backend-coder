import ProductManager from "./ProductManager";
import express from "express";

const app = express();

const PORT = 8080;

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

        res.json(limit ? products.slice(0, parseInt(limit)) : products);
    } catch (error) {
        console.error(`Error al obtener los productos: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/products/:pid", async (req, res) => {
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
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
