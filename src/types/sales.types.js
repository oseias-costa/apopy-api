module.exports = `
    type Sale {
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
        profit: Int
        percentage: Int
        date: String
    }
    
    input SaleReverseInput {
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
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        reverseSale(saleReverseInput: SaleReverseInput): Sale
    }
`;
