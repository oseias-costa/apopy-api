const Suplier = require("../model/Suplier");

module.exports = {
  Query: {
    async supliers() {
      return await Suplier.find();
    },
    async suplier(_, { id }) {
      return await Suplier.findById(id);
    },
  },
  Mutation: {
    async createSuplier(_, { suplierInput: { name, userId } }) {
      const suplier = new Suplier({ name, userId });
      return await suplier.save();
    },
    async updateSuplier(_, { suplierInput: { name } }) {
      return await Suplier.findOneAndUpdate(id, { name: name });
    },
    async deleteSuplier(_, { id }) {
      return await Suplier.findOneAndRemove(id);
    },
  },
  Suplier: {
    async suplier(_, { id }) {
      return await Suplier.findById(id);
    },
  },
};
