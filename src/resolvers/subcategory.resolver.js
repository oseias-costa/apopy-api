const Subcategory = require("../models/Subcategory");

module.exports = {
    Mutation: {
        async createSubcategory(_, { subcategoryInput: { name, category } }) {
            const subcategory = new Subcategory({ name, category });
            return await subcategory.save();
          },
    }, 
    Query: {
        async subcategories() {
            return await Subcategory.find();
        },
    },
    Subcategory: {
        async category(obj) {
            return await Category.findById(obj.category);
        },
    },
}