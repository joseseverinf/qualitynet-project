const jwt = require('jsonwebtoken');

const secret = "Secreto para clientes"
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    if(req.cookies) {
        jwt.verify(req.cookies?.usertoken, secret, (err, payload) => {
            if(err) {
                res.status(401).json({ok: false, message:'Usuario no válido'})
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ok: false, message:'Usuario no válido'})
    }
}