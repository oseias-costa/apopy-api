const { db } = require("../../services/mongodb");
const { BSON } = require("mongodb");
const { GraphQLError } = require("graphql");

async function movimentStock(ArgsInput, path, user_id) {
  const stockItemId = new BSON.ObjectId(ArgsInput.stockId);
  const userId = new BSON.ObjectId(user_id);

  const stockItem = await db.collection("stock").findOne({ _id: stockItemId });
  const decreaseCalc = (await stockItem.quantity) - ArgsInput.quantity;

  if (decreaseCalc === 0) {
    const insertSale = await db.collection(path).insertOne({
      ...ArgsInput,
      stockId: stockItemId,
      userId: userId
    });

    await db.collection("stock").deleteOne({ _id: stockItemId });
    return await db.collection('sale').findOne({ _id: insertSale.insertedId })

  } else if (decreaseCalc > 0) {
    const insertSale = await db.collection(path).insertOne({
      ...ArgsInput,
      stockId: stockItemId,
      userId: userId
    });
    await db.collection("stock").updateOne(
      { _id: stockItemId },
      {
        $inc: {
          quantity: -ArgsInput.quantity,
          total: -(ArgsInput.quantity * ArgsInput.costPrice),
        },
      }
    );

    return await db.collection('sale').findOne({ _id: insertSale.insertedId })
  } else {
    throw new GraphQLError("Quantity decreased is greater than quantity in stock");
  }
}

module.exports = movimentStock;
