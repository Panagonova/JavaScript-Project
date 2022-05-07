const token_utils = require("../token_utils");
const {User} =  require("../db");
const {sign} = require("../token_utils")

const login = async(credentials) => {
    let {email, password} = credentials;

    const hashedPassword = token_utils.hashPassword(password, "");
    let user = User.find(user => user.email === email && user.password === hashedPassword)
    if (user.length) {
        const token = sign({_id: user[0]._id}, "never")
        return {token}
    }
    return {error : "User not found"}

}

module.exports = {
    login
}
