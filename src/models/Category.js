const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
});

module.exports = model("Category", CategorySchema);
