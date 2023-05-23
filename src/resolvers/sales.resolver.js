const { db } = require("../services/mongodb");
const movimentStock  = require('../utils/stock/movimentStock')
const reverseStockMoviment  = require('../utils/stock/reverseStockMoviment')

module.exports = {
  Mutation: {
    async reverseSale(_, { saleInput }) {
      return await reverseStockMoviment(saleInput, 'sale')
    },

    async transferSale(_, { saleInput }){
      return await movimentStock(saleInput, 'sale')
    }
  },

  Query: {
    async sales() {
      return await db.collection("sale").find({}).toArray();
    },
  },
};
