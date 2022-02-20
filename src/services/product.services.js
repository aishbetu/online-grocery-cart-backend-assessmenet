const ProductModel = require('../model/product.model');

// service to find all products
const getAllProducts = async () => {
    try {
        return await ProductModel.find();
    } catch (err) {
        console.log(err);
        return err;
    }
}

const findProductById = async (id) => {
    try {
        return await ProductModel.findById(id);
    } catch (err) {
        return err;
    }
}

// service to create a product
const createProduct = async (data) => {
    const { title, description, price, category, image_url } = data;

    const product = new ProductModel({
        title : title,
        description : description,
        price : price,
        category : category,
        image_url : image_url
    });

    try {
        const saveProduct = await product.save();
        return saveProduct;
    }catch (err) {
        console.log(err);
        return err;
    }
}

const editProductDetails = async (_id, data) => {
    try {
        return await ProductModel.updateOne(
            { "_id": _id },
            data
        );
    } catch (err) {
        console.log(err);
        return err;
    }
}

const removeProduct = async (id) => {
    try {
        return await ProductModel.findOneAndDelete({ _id: id });
    } catch (err) {
        return err;
    }
}

module.exports = {
    getAllProducts,
    findProductById,
    createProduct,
    editProductDetails,
    removeProduct
}
