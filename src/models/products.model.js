import mongoose from "mongoose";

//crear coleccion
const productCollection = "products";

//generar schema
const productSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	code: { type: String, required: true, unique: true },
	price: { type: Number, required: true },
	status: { type: String, default: "activate" },
	stock: { type: Number, default: 0 },
	category: { type: String, required: true },
	thumbnails: { type: Array, default: [], required: false },
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;
