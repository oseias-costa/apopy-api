module.exports =`#graphql
  type Product {
    _id: ID
    name: String
    category: String
    subcategory: String
    suplier: String
    userId: ID
  }
  
  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  input ProductInput {
    name: String
    category: String
    subcategory: String
    suplier: String
    userId: ID
  }

  input ProductEdit {
    _id: ID
    name: String
    category: String
    subcategory: String
    suplier: String
    userId: ID
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product
    updateProduct(productEdit: ProductEdit): Product
    deleteProduct(_id: ID): Product
  }
`