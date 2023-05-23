const { db } = require("../../services/mongodb");
const { BSON } = require('mongodb');

async function reverseStockMoviment(ArgsInput, path){
    const stockItemId = new BSON.ObjectId(ArgsInput.stockId)
    const stockItem = await db.collection('stock').findOne({ _id: stockItemId })
  
    if(stockItem){
      const devolutionItemId = new BSON.ObjectId(ArgsInput._id)
  
      await db.collection(path).deleteOne({ _id: devolutionItemId})
      return await db.collection('stock').updateOne({ _id: stockItemId }, 
        {$inc: { quantity: ArgsInput.quantity, total: (ArgsInput.quantity * ArgsInput.price)}})
  
    } else {
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
      return await db.collection('stock').insertOne(reverseMoviment)
    }
  
  }

  module.exports =  reverseStockMoviment