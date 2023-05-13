module.exports = `#graphql

  type Category {
    _id: ID
    name: String
    userId: ID
    subcategory: [Subcategory]
  }
  
  type Query {
    categories(userId: ID!): [Category]
    category(id: ID!): Category
  }
    
   input CategoryInput {
    name: String
    userId: String
  }
    
  type Mutation {
      createCategory(categoryInput: CategoryInput): Category
  }
`;
