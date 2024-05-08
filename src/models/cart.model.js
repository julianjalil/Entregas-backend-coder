import mongoose from "mongoose";

//crear coleccion
const cartCollection = "cart";

//generar schema
const cartSchema = new mongoose.Schema({
	productos: [
		{
			producto: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "products",
			},
		},
	],
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
