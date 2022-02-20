const joi = require('joi');

const addProductValidation = data => {
    const addProductSchema = joi.object({
        title: joi.string().max(120).required(),
        description: joi.string().min(6).max(512).required(),
        price: joi.number().min(0).required(),
        category: joi.string().required().valid('vegetable & fruit', 'dairy', 'snacks', 'beverage', 'grain & oil', 'baby care', 'personal care', 'kitchen', 'household'),
        image_url: joi.string()
    });

    return addProductSchema.validate({ title: data.title, description: data.description, price: data.price, category: data.category, image_url: data.image_url });
}


const updateProductValidation = data => {
    const updateProductSchema = joi.object({
        title: joi.string().max(120),
        description: joi.string().min(6).max(512),
        price: joi.number().min(0),
        category: joi.string().valid('vegetable & fruit', 'dairy', 'snacks', 'beverage', 'grain & oil', 'baby care', 'personal care', 'kitchen', 'household'),
        image_url: joi.string()
    });

    return updateProductSchema.validate({ title: data.title, description: data.description, price: data.price, category: data.category, image_url: data.image_url });
}


module.exports.addProductValidation = addProductValidation;
module.exports.updateProductValidation = updateProductValidation;
