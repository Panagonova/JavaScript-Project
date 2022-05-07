const token_utils = require("../token_utils");
const {User} =  require("../db");
const {sign} = require("../token_utils")

const login = async(credentials) => {
    let {email, password} = credentials;

    const hashedPassword = token_utils.hashPassword(password, "");
    let user = User.find({email, password: hashedPassword})

    if (user && user.password !== hashedPassword)
        user = null
    if (user) {
        const token = sign({_id: user._id}, "never")
        return {token}
    }
    return {error : "User not found"}

}

module.exports = {
    login
}
