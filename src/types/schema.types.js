module.exports = `#graphql
  type Category {
    id: ID
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
