const { db } = require("../services/mongodb");

module.exports = {
  Mutation: {
    async transferLoss(_, { transferLoss }) {
      return await db.collection("loss").insertOne(transferLoss);
    },

    async reverseLoss(_, {}) {
      return await db.collection("stock").insertOne();
    },
  },

  Query: {
    async losses() {
      return await db.collection("loss").find({}).toArray();
    },
  },
};
