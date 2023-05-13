const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async createCategory(_, { categoryInput: { name, userId } }) {
      const nid = new BSON.ObjectId(userId);
      const category = await db.collection("categories").insertOne({ name, userId: nid });

      const _id = new BSON.ObjectId(category.insertedId);
      return await db.collection("categories").findOne({ _id: _id });
    },
  },

  Query: {
    async category(_, { id }) {
      const nid = new BSON.ObjectId(id);
      return await db.collection("categories").findOne({ _id: nid });
    },

    async categories(_, { userId }) {
      const id = new BSON.ObjectId(userId);
      return await db
        .collection("categories")
        .find({ userId: id })
        .toArray();
    },
  },
};
