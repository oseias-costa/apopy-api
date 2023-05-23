const { db } = require("../../services/mongodb");
const { BSON } = require('mongodb');
const { fromGraphQLError } = require("apollo-server-errors");

async function movimentStock(ArgsInput, path){
              
    const stockItemId = new BSON.ObjectId(ArgsInput.stockId)
    const stockItem = await db.collection('stock').findOne({ _id: stockItemId })

    const decreaseCalc = await stockItem.quantity - ArgsInput.quantity

    if(decreaseCalc === 0) {
        await db.collection(path).insertOne(ArgsInput)
        await db.collection('stock').deleteOne({ _id: stockItemId })

      } else if(decreaseCalc > 0){
        await db.collection(path).insertOne(ArgsInput)
        await db.collection('stock').updateOne(
          { _id: stockItemId }, 
          { $inc: 
            { quantity: - (ArgsInput.quantity), total: -(ArgsInput.quantity * ArgsInput.price)}     
          })

      } else {
        throw new fromGraphQLError('Quantity decreased is greater than quantity in stock')
    }
    
  return ArgsInput
} 

module.exports = movimentStock 