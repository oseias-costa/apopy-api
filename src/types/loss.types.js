module.exports =`#graphql
    type Loss {
        _id: ID
        userId: ID
        stockId: ID
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
    
    input LossInput {
        _id: ID
        userId: ID
        stockId: ID
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
        losses: [Loss]
    }
    
    type Mutation {
        transferLoss(transferLoss: LossInput): Loss
        reverseLoss(id: ID): Loss
    }
`