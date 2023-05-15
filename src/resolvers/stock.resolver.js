const { db } = require('../services/mongodb')
const { BSON } = require('mongodb')

module.exports = {
    Query: {
        async stock(){
            return await db.collection('stock').find({}).toArray()
        },
    },
    Mutation: {
        async createStockItem(_, { stockItem: 
            { product, category, subcategory, suplier, quantity, price, total, costPrice, description }}){
            const newItem = await db.collection('stock').insertOne({
                product, category, subcategory, suplier, quantity, price, total, costPrice, description
            })
            return newItem
        }
    }
}