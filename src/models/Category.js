const { model, Schema } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

module.exports = model("Category", CategorySchema);
