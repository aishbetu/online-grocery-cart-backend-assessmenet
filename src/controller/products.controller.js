// local imports
const { createProduct, findProductById, getAllProducts, editProductDetails, removeProduct } = require('../services/product.services');
const { getUser } = require('../services/user.service');
const { addProductValidation, updateProductValidation } = require('../validations/product.validation');

// get all products
exports.getProducts = async (req, res) => {
    console.log("get products called!");
    try {
        const products = await getAllProducts();
        // console.log(products);
        res.status(200).send(products)
    } catch (err) {
        console.log(err);
        res.send(401).status({message: "Error Occurred", err});
    }
}

// get product by id
exports.getProduct = async (req, res) => {
    console.log("get product");
    if (!req.params.id) return res.status(400).send({message: "Product id required"});
    try {
        const product = await findProductById(req.params.id);
        res.status(200).send(product)
    } catch (err) {
        console.log(err);
        res.send(401).status({message: "Error Occurred", err});
    }
}

exports.addProduct = async (req, res) => {
    console.log("add products called!");

    // get user by id from middleware
    const user = await getUser(req.user.id).catch((err) => {
        console.log(err);
        return res.send({message: "Error Occurred", err});
    });
    // validate admin access
    if (!user.is_admin) return res.send({message: "Access denied! User is not admin"});


    // Schema Validation
    const { error } = addProductValidation(req.body);
    if (error) return res.status(422).send({message: error.details[0].message});

    // console.log(req.file.filename);
    // console.log(req.body);

    try {
        const savedProduct = await createProduct(req.body, req.file);
        // console.log(savedProduct);
        res.status(201).send({message: "product has been added", createdProduct: {
            title: savedProduct.title,
            description: savedProduct.description,
            price: savedProduct.price,
            category: savedProduct.category,
            request: {
                type: 'GET',
                url: "http://localhost:5001/uploads/" + savedProduct._id
            },
            _id: savedProduct._id,
            }});
    } catch (err) {
        res.send({message: "Error Occurred", err});
    }
}

exports.updateProduct = async (req, res) => {
    console.log("update method");
    // validating if input in not undefined
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({message: 'please pass at least one field'});
    }

    // get user by id from middleware
    const user = await getUser(req.user.id).catch((err) => {
        console.log(err);
        return res.send({message: "Error Occurred", err});
    });
    // validate admin access
    if (!user.is_admin) return res.send({message: "Access denied! User is not admin"});

    const id = req.params.id;
    const data = req.body;

    // Schema Validation
    const { error } = updateProductValidation(data);
    if (error) return res.status(422).send({message: error.details[0].message});


    try {
        const updatedProduct = await editProductDetails(id, data);
        res.status(200).send({message: "details has been updated", updatedProduct});
    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Error Occurred", err});
    }
}

exports.deleteProduct = async (req, res) => {
    console.log("delete product");

    // get user by id from middleware
    const user = await getUser(req.user.id).catch((err) => {
        console.log(err);
        return res.send({message: "Error Occurred", err});
    });
    // validate admin access
    if (!user.is_admin) return res.send({message: "Access denied! User is not admin"});

    const id = req.params.id;

    try {
        const deletedProduct = await removeProduct(id);
        res.status(200).send({message: "product has been deleted", deletedProduct});
    } catch (err) {
        console.log(err);
        res.status(400).send({message: "Error Occurred", err});
    }
}

