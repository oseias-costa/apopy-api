const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Query: {
    async supliers() {
      return db.collection("supliers").find({}).toArray();
    },

    async suplier(_, { _id }) {
      const id = new BSON.ObjectId(_id);
      return await db.collection("supliers").findOne({ _id: id });
    },
  },

  Mutation: {
    async createSuplier(_, { suplierInput: { name, userId } }) {
      const nid = new BSON.ObjectId(userId);
      return await db.collection("supliers").insertOne({ name, userId: nid });
    },

    async updateSuplier(_, { suplierInput: { name, _id } }) {
      const id = new BSON.ObjectId(_id);

      await db
        .collection("supliers")
        .updateOne({ _id: id }, { $set: { name: name } });
      return { _id: id, name: name };
    },

    async deleteSuplier(_, { _id }) {
      const id = new BSON.ObjectId(_id);
      await db.collection("supliers").deleteOne({ _id: id });
      return { _id: id };
    },
  },
  // Suplier: {
  //   async suplier(_, { id }) {
  //     return await Suplier.findById(id);
  //   },
  // },
};
