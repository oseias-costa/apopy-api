module.exports = `#graphql

    type Sale {
        _id: ID
        userId: String
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
        profit: Int
        percentage: Int
        createAt: String
    }
    
    input SaleInputCreate {
        userId: String
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
        profit: Int
        percentage: Int
        createAt: String
    }

    input SaleInput {
        _id: ID
        userId: String
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
        profit: Int
        percentage: Int
        date: String
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        transferSale(saleInputCreate: SaleInputCreate): Sale
        reverseSale(saleInput: SaleInput): Sale
    }
`;
