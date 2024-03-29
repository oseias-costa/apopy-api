const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Query: {
    async supliers(_, {}, { user_id }) {
      const id = new BSON.ObjectId(user_id);
      return db.collection("supliers").find({ userId: id }).toArray();
    },

    async suplier(_, { _id }) {
      const id = new BSON.ObjectId(_id);
      return await db.collection("supliers").findOne({ _id: id });
    },
  },

  Mutation: {
    async createSuplier(_, { suplierInput: { name } }, { user_id }) {
      const nid = new BSON.ObjectId(user_id);
      const suplier = await db
        .collection("supliers")
        .insertOne({ name, userId: nid });

      const _id = new BSON.ObjectId(suplier.insertedId);
      return await db.collection("supliers").findOne({ _id: _id });
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
