const { db } = require("../services/mongodb");
const { BSON } = require("mongodb");

module.exports = {
  Query: {
    async stock(parent, args, { user_id }) {
      const _userId = new BSON.ObjectId(user_id);

      // return await db.collection("stock").find({ userId: _userId }).toArray();
      return await db.collection("stock").aggregate([
        { $match: { userId: _userId }}
      ]).toArray();
    },
  },

  Mutation: {
    async createStockItem(
      _,
      {
        stockItem: {
          product,
          category,
          subcategory,
          suplier,
          quantity,
          price,
          total,
          costPrice,
          description,
        },
      },
      { user_id }
    ) {
      const _userId = new BSON.ObjectId(user_id);
      const newStockItem = await db.collection("stock").insertOne({
        product,
        category,
        subcategory,
        suplier,
        quantity,
        price,
        total,
        costPrice,
        description,
        userId: _userId,
      });

      return await db
        .collection("stock")
        .findOne({ _id: newStockItem.insertedId });
    },

    async editStockItem(
      _,
      {
        stockItem: {
          _id,
          product,
          category,
          subcategory,
          suplier,
          quantity,
          price,
          total,
          costPrice,
          description,
        },
      }
    ) {
      const stockId = new BSON.ObjectId(_id);
      const updateStockItem = await db.collection("stock").updateOne(
        { _id: stockId },
        {
          $set: {
            product,
            category,
            subcategory,
            suplier,
            quantity,
            price,
            total,
            costPrice,
            description,
          },
        }
      );

      return await db.collection("stock").findOne({ _id: stockId });
    },

    async deleteStockItem(_, { id }) {
      const _id = new BSON.ObjectId(id);
      await db.collection("stock").deleteOne({ _id: _id });

      return { _id: _id };
    },
  },
};
