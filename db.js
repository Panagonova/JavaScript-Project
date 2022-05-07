const dbLocal = require("db-local");
const { Schema } = new dbLocal({ path: `./databases` });


const User = Schema("User", {
    _id: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    name: { type: String },
});

module.exports = {
    User
}
