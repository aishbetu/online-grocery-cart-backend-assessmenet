const { addProductToCart, getCartItems, removeItem} = require('../services/cart.services');

exports.getCart = async (req, res) => {
    console.log("get cart called!");
    const owner = req.user.id;

    try {
        const myCart = await getCartItems(owner);
        console.log(myCart);
        if (myCart && myCart.items.length > 0) return res.status(200).send(myCart);
        return res.status(400).send({message: 'Cart does not exist yet'});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

exports.addToCart = async (req, res) => {
    console.log("add to cart called!");
    const userID = req.user.id;
    const prodId = req.params.prodId;
    // making qty always 1 i.e. on btn click sends 1 qty by default
    const  quantity  = 1

    try {
        const prod = await addProductToCart(userID, prodId, quantity);
        res.status(200).send({message: "item has been added to the cart", prod});
        console.log(prod);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}

exports.removeFromCart = async (req, res) => {
    console.log("remove cart called");
    const owner = req.user.id;
    const prodId = req.params.prodId;

    try {
        const itemsLeft = await removeItem(owner, prodId);
        res.status(200).send(itemsLeft);
        console.log(itemsLeft);
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
