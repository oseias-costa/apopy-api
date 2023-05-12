const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  category: Schema.Types.ObjectId,
  subcategory: Schema.Types.ObjectId,
  suplier: String,
});

module.exports = model("Product", ProductSchema);
