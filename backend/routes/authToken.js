const res = require('express/lib/response')
const jwt = require('jsonwebtoken')
require('dotenv/config')
module.exports = function (req, res, next) {

    try {
        const token = req.headers.token
        jwt.verify(token, process.env.SECRET)
        next();

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}