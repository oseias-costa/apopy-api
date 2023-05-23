const { db } = require("../services/mongodb");
const movimentStock  = require('../utils/stock/movimentStock')
const reverseStockMoviment  = require('../utils/stock/reverseStockMoviment')

module.exports = {
  Mutation: {
    async transferLoss(_, { transferLoss }) {
      return await movimentStock(transferLoss, 'loss')
    },

    async reverseLoss(_, { transferLoss }) {
      return await reverseStockMoviment(transferLoss, 'loss')
    },
  },

  Query: {
    async losses() {
      return await db.collection("loss").find({}).toArray();
    },
  },
};
