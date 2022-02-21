const Cart = require('../model/cart.model');
const Product = require('../model/product.model');
const User = require('../model/user.model');


// service to add product to cart
const addProductToCart = async (userId, prodId, quantity) => {
    try {
        let cart = await Cart.findOne({owner: userId});
        const item = await Product.findOne({_id: prodId});
        if (!item) return 'Item not found';

        if (cart) {
            // find if same product already exist in cart 0 true | -1 false
            const itemIndex = cart.items.findIndex((item) => item.itemId == prodId);
            // if same product exist
            if (itemIndex > -1) {
                let product = cart.items[itemIndex];
                product.quantity += quantity;
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                cart.items[itemIndex] = product;
                const ct = await cart.save();
                return ct;
            } else {
                // cart exist but not the same product
                cart.items.push({itemId: item._id, name: item.title, quantity: quantity, price: item.price });
                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                return  await cart.save();
            }
        } else {
            // if cart not exist
            let cartModel = new Cart({
                owner: userId,
                items: {itemId: item._id, name: item.title, quantity: quantity, price: item.price},
                bill: quantity * item.price
            });

            const updatedCart = await cartModel.save();
            // console.log(updatedCart);
            return updatedCart;
        }

    } catch (err) {
        console.log(err);
        return err;
    }
}

// Service to get Cart items
const getCartItems = async (ownerId) => {
    try {
        return await Cart.findOne({owner: ownerId});
    } catch (err) {
        console.log(err);
        return err;
    }
}

// Service to remove item from cart
const removeItem = async (owner, itemId) => {
    try {
        let cart = await Cart.findOne({owner: owner});
        // console.log("cart", cart);
        if (!cart) return 'Cart not found';

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
        // if item exist in cart
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.bill -= item.quantity * item.price;

            if (cart.bill < 0) {
                cart.bill = 0;
            }
            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0);

            cart = await cart.save();
            return cart;
        } else {
            return 'Item Not Found';
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    addProductToCart,
    getCartItems,
    removeItem
}
