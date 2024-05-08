import { Router } from "express";
import cartModel from "../models/cart.model.js";

const cartsRouter = Router();

//Crear nuevo carrito
cartsRouter.post("/", async (req, res) => {
	try {
		const newCart = new cartModel();
		await newCart.save();
		res.send({ result: "success", payload: newCart });
		return newCart;
	} catch (error) {
		console.error(`Error al crear un nuevo carrito: ${error}`);
		res.status(500).json({
			error: "Server Error",
			msg: error,
		});
	}
});

//Obtener los productos de un carrito
cartsRouter.get("/:cid", async (req, res) => {
	try {
		let carts = await new cartModel.find(req.params.cid).populate(
			"productos.producto"
		);
		if (carts) {
			res.send({ result: "success", payload: carts });
		} else {
			res.status(404).send({
				error: "No se encontró el carrito",
				msg: error,
			});
		}
	} catch (error) {
		console.error(`No se pudo obtener el carrito ${error}`);
		res.status(500).send({
			error: "Server Error",
			msg: error,
		});
	}
});

// Agregar un producto al carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const cart = await cartModel.findById(cid);
		const prod = await productsModel.findById(pid);
		if (!cart || !prod) {
			return null;
		}

		const product = cart.productos.find(
			(product) => product.pid.toString() === pid
		);
		if (!product) {
			console.log("first");
			cart.productos.push({ pid: pid, quantity: 1 });
			await cart.save();
			res.send({ result: "success", payload: cart });
		} else {
			console.log("second");
			product.quantity++;
			await cart.updateOne({ productos: cart.productos });
			res.send({ result: "success", payload: cart });
		}

		return cart;
	} catch (error) {
		console.error(`Error al agregar producto al carrito: ${error}`);
		res.status(500).json({
			error: "Server Error",
			msg: error,
		});
	}
});

export default cartsRouter;
