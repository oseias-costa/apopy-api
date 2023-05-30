const { db } = require('../services/mongodb')
const { BSON, Db } = require('mongodb');
const subcategoryResolver = require('./subcategory.resolver');

module.exports = {
    Mutation: {      
        async createProduct(_, { 
            productInput: { name, category, subcategory, suplier, userId } }) {

            const _userId = new BSON.ObjectId(userId)
            const product = await db.collection('products')
                .insertOne({ name, category, subcategory, suplier, userId: _userId });
                console.log(product)
            return { name, category, subcategory, suplier, _id: product.insertedId }
          },
        
        async updateProduct (_, {
            productEdit: { _id, name, category, subcategory, suplier }}) {
            const id = new BSON.ObjectId(_id)

            const updateProduct = await db
                .collection('products')
                .updateOne({ _id: id }, { 
                    $set: { name, category, subcategory, suplier } })
                console.log(updateProduct)

                return { _id: id, name, category, subcategory, suplier }
            },
        
        async deleteProduct (_, { _id }){
            const id = new BSON.ObjectId(_id)
            await db.collection('products').deleteOne({ _id: id})
            return { _id: id } 
        },
    },

    Query: {
        async products() {
            return await db.collection('products').find({}).toArray();
        },

    },
}