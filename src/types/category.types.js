module.exports = `#graphql

  type Category {
    _id: ID
    name: String
    userId: ID
    subcategory: [String]
  }
  
  type Query {
    categories: [Category]
    category(id: ID!): Category
  }
    
   input CategoryInput {
    name: String
    userId: String
  }

   input CategoryEdit {
    _id: ID
    name: String
    userId: String
  }
    
  type Mutation {
      createCategory(categoryInput: CategoryInput): Category
      updateCategory(categoryEdit: CategoryEdit): Category
      deleteCategory(categoryEdit: CategoryEdit): Category
  }
  `;
