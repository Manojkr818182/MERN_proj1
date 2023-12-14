const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const { ERROR_CODE, ERROR_MESSEGE } = require('../utils/error_code');
exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    code: ERROR_CODE.INVALID_SERVER_TOKEN,
                    message: err.toString()
                })
            } else {
                User.findOne({ _id: decoded.aud }).then((user_data) => {
                    if (!user_data) {
                        return res.json({
                            code: ERROR_CODE.NOT_AUTHORIZED,
                            message: ERROR_MESSEGE.NOT_AUTHORIZED
                        })
                    }
                    req.user_id = user_data._id;
                    next();
                }).catch(err => {
                    return res.json({
                        code: ERROR_CODE.INVALID_SERVER_TOKEN,
                        message: err.toString()
                    })
                })
            }
        })
    } catch (err) {
        return res.json({
            code: ERROR_CODE.INVALID_SERVER_TOKEN,
            message: err.toString()
        })
    }
}