const config = require('./config/config')
const jwt = require('jwt-simple')

module.exports = function getIdFromToken(req) {
    if (req.headers && req.headers.authorization) {
        var userToken = req.headers.authorization.split(' ')[1]
    } else if (req.body.headers && req.body.headers.authorization) {
        var userToken = req.body.headers.authorization.split(' ')[1]
    }
    try {
        var decoded = jwt.decode(userToken, config.jwtSecret);
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    var userId = decoded.id;
    return userId
}