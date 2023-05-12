const { model, Schema, defaut: mongoose } = require("mongoose");

const SubcategorySchema = new Schema({
  name: String,
  category: Schema.Types.ObjectId,
});

module.exports = model("Subcategory", SubcategorySchema);
