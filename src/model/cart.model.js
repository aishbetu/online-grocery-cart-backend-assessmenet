const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            required: true,
            min: 1
        },
        price: {
            type: Number,
        }
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('cart', CartSchema);
