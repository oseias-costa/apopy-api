const { db } = require('../services/mongodb')

module.exports = {
    Mutation: {
        async createCategory(_, { categoryInput: { name } }) {
            const category = await db.insertOne({ name })
            return console.log(category)
          },
    },
    Query: {
        async category(_, { id }) {
            return await db.collection('categories').findOne({ _id: id })
        },
        async categories() {
            return await db.collection('categories').find({}).toArray();
        },
    }
}
