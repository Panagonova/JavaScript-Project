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
    gender: { type: String },
    image: { type: String },
    category: { type: String },
    price: { type: Number },
    color: { type: String },
    style: { type: String },
    size: { type: String },
    material: { type: String },
    count: { type: Number },
    rating: { type: Number },
    hot: { type: Boolean },
    promotion: { type: Boolean },
    trending: { type: Boolean },
    date: { type: String },
});

module.exports = {
    User,
    Product
}
