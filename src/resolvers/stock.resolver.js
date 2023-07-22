const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Query: {
    async stock(parent, args, { user_id }) {
      const _userId = new BSON.ObjectId(user_id);
      return await db.collection("stock").find({userId: _userId}).toArray();
    },
  },
  
  Mutation: {
    async createStockItem( _, { stockItem: { 
          product, category, subcategory, suplier, quantity, price, total, costPrice, description,
        }, }, { user_id }
    ) {

      const _userId = new BSON.ObjectId(user_id);
      const newItem = await db.collection("stock").insertOne({ 
        product, category, subcategory, suplier, quantity, price, total, costPrice, description, userId: _userId
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
