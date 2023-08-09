module.exports = `#graphql

    type Sale {
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
        profit: Int
        percentage: Int
        date: String
    }
    
    input SaleInputCreate {
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
        profit: Int
        percentage: Int
        date: String
    }

    input SaleInput {
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
        profit: Int
        percentage: Int
        date: String
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        transferSale(saleInput: SaleInputCreate): Sale
        reverseSale(saleInput: SaleInput): Sale
    }
`;
