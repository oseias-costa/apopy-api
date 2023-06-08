module.exports = `#graphql

    type Subcategory {
        name: String
        _id: ID
        subcategory: [String]
    }
    
    
    input SubcategoryInput {
        name: String
        category: ID
    }

    input SubcategoryEdit {
        _id: ID
        name: String
        newName: String
        category: ID
    }
    
    type Mutation {
        createSubcategory(subcategoryInput: SubcategoryInput): Subcategory
        updateSubcategory(subcategoryEdit: SubcategoryEdit): Subcategory
        deleteSubcategory(subcategoryEdit: SubcategoryEdit): Subcategory
    }
`;
