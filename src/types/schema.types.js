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
  

  type Subcategory {
    id: ID
    name: String
    category: Category
  }

  type Query {
    subcategories: [Subcategory]
  }


  input SubcategoryInput {
    name: String
    category: ID
  }

  type Mutation {
    createSubcategory(subcategoryInput: SubcategoryInput): Subcategory
  }
`;
