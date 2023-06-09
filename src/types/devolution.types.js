module.exports =`#graphql

    type Devolution {
        _id: ID
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
        stockId: ID
    }
    
    input DevolutionInput {
        _id: ID
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
        stockId: ID
    }
    
    type Query {
        devolutions: [Devolution]
    }
    
    type Mutation {
        transferDevolution(devolutionInput : DevolutionInput): Devolution
        reverseDevolution(devolutionInput : DevolutionInput): Devolution
    }
`