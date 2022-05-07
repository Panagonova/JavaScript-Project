let crypto = require("crypto");
let jwt    = require("jsonwebtoken");

const SHA_NOISE = "kjsdhksdjf343lsdkjfs$%fgd##$";
const AUTH_TOKEN_EXPIRY = parseInt(process.env.AUTH_TOKEN_EXPIRY);

let verify = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, SHA_NOISE, (err, result) => {
            if (err)
                return reject(err)
            resolve(result)
        });
    });

/**
 *
 * @param {Object} token_data
 * @param {String|Number} [expiration]
 *
 * @return {Object}
 */
let sign = (token_data, expiration) =>
    jwt.sign(token_data, SHA_NOISE, {...expiration !== "never" ? {expiresIn: expiration || AUTH_TOKEN_EXPIRY} : ""});


let hashPassword = ( val, noise ) => {
    let shasum = crypto.createHash( 'sha256' );
    shasum.update( val + noise + SHA_NOISE);
    return shasum.digest( 'hex' );
};

module.exports = {
    verify,
    sign,
    hashPassword
};
