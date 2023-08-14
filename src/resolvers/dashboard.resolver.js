const { BSON } = require("mongodb");
const { db } = require("../services/mongodb")

module.exports = {
    Query: {
        async dashboard(_, args, { user_id }){
            const id = new BSON.ObjectID(user_id)

            const totalProducts = await db.collection('stock').aggregate([
                { $match: { userId: id}},
                { $group: {
                    _id: null,
                    totalValue: { $sum: "$total" },
                    totalItems: { $sum: 1},
                    products: { $sum: "$quantity" }
                }}
            ]).toArray()

            return totalProducts[0]
        }
    }
}