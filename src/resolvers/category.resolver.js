const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async createCategory(_, { categoryInput: { name } }, { user_id }) {
      const nid = new BSON.ObjectId(user_id);
      const category = await db
        .collection("categories")
        .insertOne({ name, userId: nid });

      const _id = new BSON.ObjectId(category.insertedId);
      return await db.collection("categories").findOne({ _id: _id });
    },

    async updateCategory(_, { categoryEdit: { name, _id } }) {
      const id = new BSON.ObjectId(_id);

      await db
        .collection("categories")
        .updateOne({ _id: id }, { $set: { name: name } });
      return { _id: id, name: name };
    },

    async deleteCategory(_, { categoryEdit: { _id } }) {
      const id = new BSON.ObjectId(_id);

      await db.collection("categories").deleteOne({ _id: id });
      return { _id: id };
    },
  },

  Query: {
    async category(_, { id }) {
      const nid = new BSON.ObjectId(id);
      return await db.collection("categories").findOne({ _id: nid });
    },

    async categories(_, args, { user_id }) {
      const id = new BSON.ObjectId(user_id);
      return await db.collection("categories").find({ userId: id }).toArray();
    },
  },

  // Subcategories: {
  //   async subcategory(_, { id }) {
  //     const nid = new BSON.ObjectId(id);
  //     const res = await db.collection("categories").findOne({ _id: nid });
  //     return res.subcategory.map(function (item) {
  //       return console.log(item);
  //     });
  //   },
  // },
};
