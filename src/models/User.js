const { model, Schema } = require('mongoose')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String
})

module.exports = model("User", UserSchema)