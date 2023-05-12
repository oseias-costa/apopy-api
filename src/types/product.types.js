module.exports = `#graphql
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
  
  type Query {
    products: [Product]
  }
`