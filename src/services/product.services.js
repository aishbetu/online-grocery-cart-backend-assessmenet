const ProductModel = require('../model/product.model');

// service to find all products
const getAllProducts = async () => {
    try {
        const products = await ProductModel.find().select("title description price category image");
        console.log(products);
        const modifiedProduct = products.map(product => {
            return {
                _id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
                image: product.image,
                request: {
                    type: 'GET',
                    url: "http://localhost:5001/uploads/" + product._id
                }
            }
        });
        console.log(modifiedProduct);
        return modifiedProduct;
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
const createProduct = async (reqBody, reqFile) => {
    // console.log(reqBody);
    // console.log(reqBody.path);
    const product = new ProductModel({
        title : reqBody.title,
        description : reqBody.description,
        price : reqBody.price,
        category : reqBody.category,
        image : reqFile.path
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
