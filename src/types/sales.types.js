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
        percentage: Float
        date: String
    }

    input SaleInputTransfer {
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
        percentage: Float
        date: String
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        transferSale(saleInputTransfer: SaleInputTransfer): Sale
        reverseSale(saleInputTransfer: SaleInputTransfer): Sale
    }
`;
