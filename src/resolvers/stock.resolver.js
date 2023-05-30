const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Query: {
    async stock() {
      return await db.collection("stock").find({}).toArray();
    },
  },
  
  Mutation: {
    async createStockItem( _, { stockItem: { 
          product, category, subcategory, suplier, quantity, price, total, costPrice, description,
        },
      }
    ) {
      const newItem = await db.collection("stock").insertOne({ 
        product, category, subcategory, suplier, quantity, price, total, costPrice, description,
      });
      return newItem;
    },

    async editStockItem( _, { stockItem: 
      { id, product, category, subcategory, suplier, quantity, price, total, costPrice, description }, }) {
      const _id = new BSON.ObjectId(id);
      await db.collection("stoch").updateOne(
        { _id: _id }, { $set: { 
          product, category, subcategory, suplier, quantity, price, total, costPrice, description
          },
        }
      );
      return stockItem;
    },

    async deleteStockItem(_, { id }) {
      const _id = new BSON.ObjectId(id);
      await db.collection("stock").deleteOne({ _id: _id });
      return { _id: _id };
    },
  },
};
