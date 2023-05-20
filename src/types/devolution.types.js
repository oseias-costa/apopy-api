module.exports = `
        type Devolution {
        userId: ID
        category: String
        subcategory: String
        product: String
        suplier: String
        quantity: Int
        price: Int
        total: Int
        costPrice: Int
        description: String
        reason: String
    }
    
    input DevolutionInput {
        userId: ID
        category: String
        subcategory: String
        product: String
        suplier: String
        quantity: Int
        price: Int
        total: Int
        costPrice: Int
        description: String
        reason: String
    }
    
    type Query {
        devolutions: [Devolution]
    }
    
    type Mutation {
        transferDevolution(devolutionInput : DevolutionInput): Devolution
        reverseDevolution(id: ID): Devolution
    }
`