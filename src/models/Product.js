const { model, Schema } = require('mongoose')

const ProductSchema = new Schema({
    category: String,
    suplier: String,
    description: String
})

module.exports = model("Product", ProductSchema)