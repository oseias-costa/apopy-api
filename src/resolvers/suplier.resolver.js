const { db } = require('../services/mongodb')
const { BSON } = require('mongodb')

module.exports = {
  Query: {
    async supliers() {
      return db.collection('supliers').find({}).toArray()
    },
    
    async suplier(_, { _id }) {
      const id = new BSON.ObjectId(_id)
      return await db.collection('supliers').findOne({ _id: id })
    },
  },

  Mutation: {
    async createSuplier(_, { suplierInput: { name, userId } }) {
      const nid = new BSON.ObjectId(userId)
      const save = await db.collection('supliers').insertOne({ name, userId: nid })
      console.log(save)
      return { name, userId }
    },

    async updateSuplier(_, { suplierInput: { name, _id } }) {
      const id = new BSON.ObjectId(_id)

      await db.collection('supliers').updateOne({ _id: id }, { $set: { name: name } })
      return { name }
    },

    async deleteSuplier(_, { _id }) {
      const id = new BSON.ObjectId(_id)
      await db.collection('supliers').deleteOne({ _id: id});
      return { _id: id} 
    },
  },
  // Suplier: {
  //   async suplier(_, { id }) {
  //     return await Suplier.findById(id);
  //   },
  // },
};
