module.exports = `#graphql
  type User {
    id: ID
    name: String
    email: String
    password: String
    phone: String
    token: String
  }

  type Product {
    id: ID
    category: String
    suplier: String
    description: String
    #name: String
    #category: Category
    #subcategory: Subcategory
    #suplier: Suplier
    #price: Int
  }
  
  type Category {
    _id: ID
    name: String
    subcategory: [Subcategory]
  }

  type Subcategory {
    id: ID
    name: String
    category: Category
  }

  type Query {
    categories: [Category]
    category(id: ID!): Category
    subcategories: [Subcategory]
  }

  input CategoryInput {
    name: String
  }

  input SubcategoryInput {
    name: String
    category: ID
  }

  type Mutation {
    createCategory(categoryInput: CategoryInput): Category
    createSubcategory(subcategoryInput: SubcategoryInput): Subcategory
  }
`;
