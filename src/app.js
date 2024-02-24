import express from "express";
import { Server } from "socket.io";
import handlebars  from "express-handlebars";
import __dirname from "./utils.js";
import router from "./routes/views.routes.js";

const app = express();
const PORT = 8080;
const io = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"))

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use('/', router)

const httpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});