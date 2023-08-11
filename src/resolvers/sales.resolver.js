const { db } = require("../services/mongodb");
const movimentStock = require("../utils/stock/movimentStock");
const reverseStockMoviment = require("../utils/stock/reverseStockMoviment");
const { BSON } = require("mongodb");

module.exports = {
  Mutation: {
    async reverseSale(_, { saleInputTransfer }) {
      return await reverseStockMoviment(saleInputTransfer, "sale");
    },

    async transferSale(_, { saleInputTransfer }, { user_id }) {
      return await movimentStock(saleInputTransfer, "sale", user_id);
    },
  },

  Query: {
    async sales(parent, args, { user_id }) {
      const id = new BSON.ObjectId(user_id)

      return await db.collection("sale").find({ userId: id }).toArray();
    },
  },
};
