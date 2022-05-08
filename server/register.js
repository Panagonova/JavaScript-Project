const token_utils = require("../token_utils");
const {nanoid} = require ("nanoid")
const {User} =  require("../db");
const {sign} = require("../token_utils");

const register = async(credentials) => {
    let {name, email, password} = credentials;

    const alreadyExist = User.find({email})
    if (alreadyExist)
        return {error: "User already exists"}

    const _id = nanoid();
    const hashedPassword = token_utils.hashPassword(password, "");
    const user = User.create({_id, name, email, password: hashedPassword})
    user.save();

    const token = sign({_id: _id}, "never")
    return {token}
}

module.exports = {
    register
}
