class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    static incrementalId = 1000;
    #products;
    #dirPath;
    #filePath;
    #fs;

    constructor(products) {
        this.#products = new Array();
        this.#dirPath = "./files";
        this.#filePath = this.#dirPath + "./productos.json";
        this.#fs = require("fs");
    }

    validate(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (this.#products.some((product) => product.code === code)) {
            throw new Error("El código del producto ya está en uso.");
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        this.validate(title, description, price, thumbnail, code, stock);

        let newProduct = new Producto(
            this.incrementalId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        );
        try {
            //creacion del directorio
            await this.#fs.promises.mkdir(this.#dirPath, { recursive: true });

            //escritura del archivo
            if (!this.#fs.existsSync(this.#filePath)) {
                await this.#fs.promises.writeFile(this.#filePath, "[]");
            }

            //lectura del archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );

            this.#products = JSON.parse(productosFile);

            this.#products.push(newProduct);
        } catch (error) {
            console.log(`Error al crear el producto. ${error}`);
        }

        const id = ProductManager.incrementalId++;
    };

    getProducts = async () => {
        try {
            // Lectura del archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );

            this.#products = JSON.parse(productosFile);

            return this.#products;
        } catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
            return [];
        }
    };

    getProductsById = async (productId) => {
        try {
            // Lectura del archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );

            this.#products = JSON.parse(productosFile);

            // Buscar el producto por el id especificado
            const product = this.#products.find(
                (product) => product.id === productId
            );

            if (product) {
                return product;
            } else {
                console.log("Producto no encontrado");
                return null;
            }
        } catch (error) {
            console.error(`Error al obtener el producto por ID: ${error}`);
            return null;
        }
    };

    updateProduct = async (productId, updatedFields) => {
        try {
            // Lectura archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );

            this.#products = JSON.parse(productosFile);

            // Buscar índice del producto por id
            const index = this.#products.findIndex(
                (product) => product.id === productId
            );

            if (index !== -1) {
                // Actualizar el producto
                this.#products[index] = {
                    ...this.#products[index],
                    ...updatedFields,
                };

                // Escribir los productos actualizados en el archivo
                await this.#fs.promises.writeFile(
                    this.#filePath,
                    JSON.stringify(this.#products, null, 2)
                );

                return this.#products[index];
            } else {
                console.log("Producto no encontrado");
                return null;
            }
        } catch (error) {
            console.error(`Error al actualizar el producto: ${error}`);
            return null;
        }
    };

    deleteProduct = async (productId) => {
        try {
            // Lectura del archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );

            this.#products = JSON.parse(productosFile);

            // Filtrar los productos excluyendo el que tiene el id especificado
            this.#products = this.#products.filter(
                (product) => product.id !== productId
            );

            // Escribir los productos actualizados en el archivo
            await this.#fs.promises.writeFile(
                this.#filePath,
                JSON.stringify(this.#products, null, 2)
            );

            console.log(
                `Producto con ID ${productId} eliminado correctamente.`
            );

            return true;
        } catch (error) {
            console.error(`Error al eliminar el producto: ${error}`);
            return false;
        }
    };
}

export default ProductManager;
