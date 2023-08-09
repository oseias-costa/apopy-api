const { db } = require("../services/mongodb");
const movimentStock = require("../utils/stock/movimentStock");
const reverseStockMoviment = require("../utils/stock/reverseStockMoviment");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async reverseSale(_, { saleInput }) {
      return await reverseStockMoviment(saleInput, "sale");
    },

    async transferSale(_, { saleInputCreate }, { user_id }) {
      return await movimentStock(saleInputCreate, "sale", user_id);
    },
  },

  Query: {
    async sales(parent, args, { user_id }) {
      return await db.collection("sale").find({ userId: user_id }).toArray();
    },
  },
};
