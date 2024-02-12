class Producto {
    constructor(title, description, code, price, status, stock, category, thumbnails) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category
        this.thumbnails = thumbnails;
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

    addProduct = async (title, description, code, price, status, stock, category, thumbnails) => {
        try {
            if (!title || !description || !code || !price || !status || !stock || !category) {
                throw new Error("Todos los campos son obligatorios");
            }
    
            // Generar ID único
            const newProductId = ProductManager.incrementalId++;
    
            // Nuevo producto
            const newProduct = new Producto(
                newProductId,
                title,
                description,
                code,
                price,
                status = true,
                stock,
                category,
                thumbnails
            );
    
            // Leer los productos existentes del archivo
            let productosFile = await this.#fs.promises.readFile(
                this.#filePath,
                "utf-8"
            );
            this.#products = JSON.parse(productosFile);
    
            // Agregar el nuevo producto a la lista
            this.#products.push(newProduct);
    
            // Escribir los productos actualizados en el archivo
            await this.#fs.promises.writeFile(
                this.#filePath,
                JSON.stringify(this.#products, null, 2)
            );
    
            return newProduct;
        } catch (error) {
            console.error(`Error al crear el producto: ${error}`);
            throw error;
        }
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

            // Filtrar productos
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
