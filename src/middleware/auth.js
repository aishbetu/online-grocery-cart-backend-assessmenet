const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

module.exports = function (req, res, next) {

    if (!req.header("Authorization")) return res.status(401).send({message: 'jwt token needed'});

    const token = req.header("Authorization").replace('Bearer ', '');
    if (!token) return res.status(401).send({message: 'Access denied!'});

    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifyToken.user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({message: 'Invalid Token'});
    }
}

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '')
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findOne({_id: decoded._id,})
//         if (!user) {
//             throw new Error()
//         }
//         // just to logout user from single device
//         req.token = token
//
//
//         req.user = user
//         next()
//     } catch (error) {
//         res.status(401).send({error: 'Please authenticate'})
//     }
// }
//
// module.exports = auth
