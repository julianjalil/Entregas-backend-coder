import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/cart.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

//configuracion hbs
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// conexion con MongoDB
const URL_MONGO =
	"mongodb+srv://jjalil:FhVaeAXZRmSw7ISq@cluster0.3e2jjzh.mongodb.net/ecommerceCoder?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async () => {
	try {
		//crea la conexion con mongodb
		await mongoose.connect(URL_MONGO);
		console.log("Conectado con exito a mongoDB con mongoose");
	} catch (error) {
		console.error("No se pudo conectar a la DB usando mongoose " + error);
		process.exit();
	}
};

connectMongoDB();
