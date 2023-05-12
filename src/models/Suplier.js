const { model, Schema } = require("mongoose");

const SuplierSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

module.exports = model("Suplier", SuplierSchema);
