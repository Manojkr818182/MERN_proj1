var jwt = require('jsonwebtoken');


exports.generateToken = (user_id) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.JWT_KEY;
        const options = {
            issuer: 'MNJ',
            audience: user_id,
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err)
            }
            resolve(token)
        })
    });
};