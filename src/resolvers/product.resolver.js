const Product = require("../models/Product");

module.exports = {
    Mutation: {      
        async createSubcategory(_, { subcategoryInput: { name, category } }) {
            const subcategory = new Subcategory({ name, category });
            return await subcategory.save();
          },
    },
    Query: {
        async products() {
            return await Product.find();
        },
    },
}