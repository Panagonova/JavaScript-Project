const {nanoid} = require ("nanoid")
const {Product} =  require("../db");

const read = async () => {

}

const create = async (productData) => {
    const _id = nanoid();
    const finalData = Object.assign({_id, productData})
    Product.create(finalData).save();

    return {success: true,data: finalData};
}

const update = async (productData) => {

    let product = Product.find({_id: productData._id})
    product.update(productData).save();

    return {success: true};
}

const remove = async (data) => {
    Product.remove({_id: data._id});
    return {success: true};
}

module.exports = {
    read,
    create,
    update,
    remove
}
