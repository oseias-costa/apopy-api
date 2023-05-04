const { model, Schema, default: mongoose } = require("mongoose");

const SubcategorySchema = new Schema({
  name: String,
  category: String,
});

module.exports = model("Subcategory", SubcategorySchema);
