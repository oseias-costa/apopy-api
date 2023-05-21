const { db } = require("../services/mongodb");

module.exports = {
  Mutation: {
    async transferDevolution(_, { devolutionInput }) {
      return await db.collection("devolution").insertOne(devolutionInput);
    },

    async reverseDevolution(_, {}) {
      return await db.collection("stock").insertOne({});
    },
  },

  Query: {
    async devolutions() {
      return await db.collection("devolution").find({}).toArray();
    },
  },
};
