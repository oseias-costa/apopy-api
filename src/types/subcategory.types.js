module.exports = `#graphql
    type Subcategory {
        name: String
    }
    
    input SubcategoryInput {
        name: String
        category: ID
    }
    
    type Mutation {
        createSubcategory(subcategoryInput: SubcategoryInput): Subcategory
    }
`;
