const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: `./databases` });


const User = Schema("User", {
    _id: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    name: { type: String },
});

const Product = Schema("Product", {
    _id: { type: String, required: true },
    name: { type: String },
    images: { type: Array },
    category: { type: String },
    price: { type: String },
    color: { type: String },
    style: { type: String },
    size: { type: String },
    material: { type: String },
    count: { type: String },
    hot: { type: Boolean },
    promotion: { type: Boolean },
    trending: { type: Boolean },
});

module.exports = {
    User,
    Product
}
