const {nanoid} = require ("nanoid")
const {Product} =  require("../db");

const read = async (query) => {
    const {page, size} = query
    delete query.page
    delete query.size
    let result = Product.find((user) => Object.keys(query).every(key => query[key] === user[key]));
    const startIndex = size * ((page || 1) - 1)
    const endIndex = startIndex + size
    return {count: result.length, data: (result || []).slice(startIndex, endIndex)}
}

const create = async (productData) => {
    const _id = nanoid();
    const finalData = Object.assign({_id, date: new Date().toISOString()}, productData)
    Product.create(finalData).save();
    return {success: true,data: finalData};
}

const update = async (productData) => {

    let product = Product.find({_id: productData._id})
    product.update(productData).save();

    return {success: true};
}

const remove = async (data) => {
    Product.remove({_id: data.id});
    return {success: true};
}

module.exports = {
    read,
    create,
    update,
    remove
}
