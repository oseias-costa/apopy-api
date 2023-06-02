const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async createSubcategory(_, { subcategoryInput: { name, category } }) {
      const id = new BSON.ObjectId(category);
      return await db
        .collection("categories")
        .updateOne({ _id: id }, { $push: { subcategory: name } });
    },

    async updateSubcategory(
      _,
      { subcategoryEdit: { name, category, newName } }
    ) {
      const id = new BSON.ObjectId(category);

      await db
        .collection("categories")
        .updateOne(
          { _id: id, subcategory: name },
          { $set: { "subcategory.$": newName } }
        );
      return { _id: id, name: newName };
    },

    async deleteSubcategory(_, { subcategoryEdit: { name, category } }) {
      const id = new BSON.ObjectId(category);

      const deleteDoc = await db
        .collection("categories")
        .updateOne({ _id: id }, { $pull: { subcategory: name } });
      console.log(deleteDoc);

      return { _id: id };
    },
  },
};
