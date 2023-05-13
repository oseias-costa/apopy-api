const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async createSubcategory(_, { subcategoryInput: { name, category } }) {
      const id = new BSON.ObjectId(category);
      await db
        .collection("categories")
        .updateOne({ _id: id }, { $push: { subcategory: name } });
      return { name };
    },
  },
  //  Subcategory: {
  //  async category(obj) {
  //      return await Category.findById(obj.category);
  //   },
  //},
};
