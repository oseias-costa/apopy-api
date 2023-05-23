const { db } = require("../services/mongodb");
const movimentStock  = require('../utils/stock/movimentStock')
const reverseStockMoviment  = require('../utils/stock/reverseStockMoviment')

module.exports = {
  Mutation: {
    async transferDevolution(_, { devolutionInput }) {
      return await movimentStock(devolutionInput, 'devolution')
    },

    async reverseDevolution(_, { devolutionInput }) {
      return await reverseStockMoviment(devolutionInput, 'devolution')
    },
  },

  Query: {
    async devolutions() {
      return await db.collection("devolution").find({}).toArray();
    },
  },
};
