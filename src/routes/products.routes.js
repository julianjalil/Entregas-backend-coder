import express from "express";
import productModel from "../models/products.model.js";

const productsRouter = express.Router();

// Obtener lista de productos
productsRouter.get("/", async (req, res) => {
	try {
		let products = await productModel.find();
		res.json(products);
	} catch (error) {
		console.error(`Error al obtener los productos: ${error}`);
		res.status(500).json({ error: "Server Error", msg: error });
	}
});

// Obtener producto por su ID
productsRouter.get("/:pid", async (req, res) => {
	try {
		let product = await productModel.find(req.params.pid);

		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ error: "Producto no encontrado" });
		}
	} catch (error) {
		console.error(`Error al obtener el producto: ${error}`);
		res.status(500).json({ error: "Server Error", msg: error });
	}
});

// Crear nuevo producto
productsRouter.post("/", async (req, res) => {
	try {
		const { title, description, code, price, stock, category, thumbnails } =
			req.body;
		const product = await productModel.create({
			title,
			description,
			price,
			code,
			stock,
			category,
			thumbnails,
		});
		res.status(201).json(product);
	} catch (error) {
		console.error(`Error al agregar el producto: ${error}`);
		res.status(400).json({
			error: error.message,
			msg: error,
		});
	}
});

// Actualizar producto por ID
productsRouter.put("/:pid", async (req, res) => {
	try {
		let updatedFields = req.body;
		let product = await productModel.updateOne(
			{ _id: req.params.pid },
			updatedFields
		);

		res.send({ result: "success", payload: product });
	} catch (error) {
		console.error(`Error al actualizar el producto: ${error}`);
		res.status(500).json({ error: "Server Error", msg: error });
	}
});

// Eliminar producto por ID
productsRouter.delete("/:pid", async (req, res) => {
	try {
		let updatedFields = req.body;
		let product = await productModel.deleteOne(
			{ _id: req.params.pid },
			updatedFields
		);

		res.send({ result: "success", payload: product });
	} catch (error) {
		console.error(`Error al eliminar el producto: ${error}`);
		res.status(500).json({ error: "Server Error", msg: error });
	}
});

export default productsRouter;
