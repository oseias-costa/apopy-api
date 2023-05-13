const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async createCategory(_, { categoryInput: { name, userId } }) {
      const nid = new BSON.ObjectId(userId);
      const category = await db.insertOne({ name, userId: nid });
      return console.log(category);
    },
  },
  Query: {
    async category(_, { id }) {
      const nid = new BSON.ObjectId(id);
      return await db.collection("categories").findOne({ _id: nid });
    },
    async categories(_, { userId }) {
      return await db
        .collection("categories")
        .find({ userId: userId })
        .toArray();
    },
  },
};
