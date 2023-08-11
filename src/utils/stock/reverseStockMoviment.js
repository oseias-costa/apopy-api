const { db } = require("../../services/mongodb");
const { BSON } = require('mongodb');

async function reverseStockMoviment(ArgsInput, path){
    const stockItemId = new BSON.ObjectId(ArgsInput.stockId)
    const stockItem = await db.collection('stock').findOne({ _id: stockItemId })
  
    if(stockItem){
      const devolutionItemId = new BSON.ObjectId(ArgsInput._id)
      const total = ArgsInput.quantity * ArgsInput.price

      await db.collection(path).deleteOne({ _id: devolutionItemId})
      const updateStock = await db.collection('stock').updateOne({ _id: stockItemId }, 
        {$inc: { quantity: ArgsInput.quantity, total: total}})
      return await db.collection('stock').findOne({ _id: stockItemId })
  
    } else {
      const devolutionItemId = new BSON.ObjectId(ArgsInput._id)
      const reverseMoviment = {
        userId: ArgsInput.userId,
        category: ArgsInput.category,
        subcategory: ArgsInput.subcategory,
        product: ArgsInput.product,
        suplier: ArgsInput.suplier,
        quantity: ArgsInput.quantity,
        price: ArgsInput.price,
        total: ArgsInput.total,
        costPrice: ArgsInput.costPrice,
        description: ArgsInput.description,
      }
  
      await db.collection(path).deleteOne({ _id: devolutionItemId})
      await db.collection('stock').insertOne(reverseMoviment)
      return await db.collection('stock').findOne({ _id: stockItemId })
    }
  
  }

  module.exports =  reverseStockMoviment