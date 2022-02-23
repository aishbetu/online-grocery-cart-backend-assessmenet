const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 120
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    category: {
        type: String,
        enum: ['vegetable & fruit', 'dairy', 'snacks', 'beverage', 'grain & oil', 'baby care', 'personal care', 'kitchen', 'household'],
        default: 'grain & oil'
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema);
