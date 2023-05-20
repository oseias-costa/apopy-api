const { db } = require("../services/mongodb");

module.exports = {
  Mutation: {
    async reverseSale(_, { saleReverseInput }) {
      return await db.collection("sales").insertOne(saleReverseInput);
    },
  },

  Query: {
    async sales() {
      return await db.collection("sale").find({}).toArray();
    },
  },
};
