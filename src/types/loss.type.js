module.exports = `
    type Loss {
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
    
    input LossInput {
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
        losses: [Loss]
    }
    
    type Mutation {
        transferLoss(transferLoss: LossInput): Loss
        reverseLoss(id: ID): Loss
    }
`;
