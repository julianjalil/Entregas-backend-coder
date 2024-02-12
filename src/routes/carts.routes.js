import express from "express";

const cartsRouter = express.Router();

let carts = [];
let incrementalId = 0;

// Crear un nuevo carrito
cartsRouter.post("/", (req, res) => {
    try {
        // Generar un ID único para el carrito
        const newCartId = incrementalId++;
        const newCart = {
            id: newCartId,
            products: []
        };

        // Agregar el nuevo carrito a la lista
        carts.push(newCart);

        res.status(201).json(newCart);
    } catch (error) {
        console.error(`Error al crear un nuevo carrito: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

// Obtener los productos de un carrito con ID específico
cartsRouter.get("/:cid", (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = carts.find(cart => cart.id === cartId);

        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error(`Error al obtener productos del carrito: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

// Agregar un producto al carrito
cartsRouter.post("/:cid/product/:pid", (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const { quantity } = req.body;

        // Buscar el carrito
        const cart = carts.find(cart => cart.id === cartId);

        if (!cart) {
            res.status(404).json({ error: "Carrito no encontrado" });
            return;
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(product => product.id === productId);

        if (existingProduct) {
            // Incrementar la cantidad si el producto ya existe en el carrito
            existingProduct.quantity += quantity || 1;
        } else {
            // Agregar el producto al carrito con la cantidad especificada
            cart.products.push({
                id: productId,
                quantity: quantity || 1
            });
        }

        res.status(200).json(cart.products);
    } catch (error) {
        console.error(`Error al agregar producto al carrito: ${error}`);
        res.status(500).json({ error: "Server Error" });
    }
});

export default cartsRouter;