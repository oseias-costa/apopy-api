const Category = require("../models/Category");

module.exports = {
    Mutation: {
        async createCategory(_, { categoryInput: { name } }) {
            const category = new Category({ name });
            return await category.save();
          },
    },
    Query: {
        async category(_, { id }) {
            return await Category.findById(id);
        },
        async categories() {
            return await Category.find();
        },
    }
}
