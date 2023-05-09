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
  
  input CreateProduct {
      name: String
      subcategory: Subcategory
  }
  
  type Query {
    products: [Product]
  
`