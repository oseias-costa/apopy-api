const { db } = require("../../services/mongodb");
const { BSON } = require("mongodb");

async function movimentStock(ArgsInput, path, user_id) {
  const stockItemId = new BSON.ObjectId(ArgsInput.stockId);
  const userId = new BSON.ObjectId(user_id);
  const stockItem = await db.collection("stock").findOne({ _id: stockItemId });

  const decreaseCalc = (await stockItem.quantity) - ArgsInput.quantity;

  if (decreaseCalc === 0) {
    await db.collection(path).insertOne({
      userId: userId,
      stockId: stockItemId,
      category: ArgsInput.category,
      subcategory: ArgsInput.subcategory,
      product: ArgsInput.product,
      suplier: ArgsInput.suplier,
      quantity: ArgsInput.quantity,
      price: ArgsInput.price,
      total: ArgsInput.total,
      costPrice: ArgsInput.costPrice,
      description: ArgsInput.description,
      profit: ArgsInput.profit,
      percentage: ArgsInput.percentage,
      date: new Date(),
    });
    await db.collection("stock").deleteOne({ _id: stockItemId });
  } else if (decreaseCalc > 0) {
    await db.collection(path).insertOne(ArgsInput);
    await db.collection("stock").updateOne(
      { _id: stockItemId },
      {
        $inc: {
          quantity: -ArgsInput.quantity,
          total: -(ArgsInput.quantity * ArgsInput.price),
        },
      }
    );
  } else {
    console.log("Quantity decreased is greater than quantity in stock");
  }

  return ArgsInput;
}

module.exports = movimentStock;
