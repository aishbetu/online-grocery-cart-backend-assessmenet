const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    if (!req.header("Authorization")) return res.status(401).send({message: 'jwt token needed'});
    const token = req.header("Authorization").replace('Bearer ', '');
    if (!token) return res.status(401).send({message: 'Access denied!'});

    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifyToken.user;
        next();
    } catch (err) {
        res.status(500).send({message: 'Invalid Token'});
    }
}

