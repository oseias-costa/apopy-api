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
        price: Float
        total: Float
        costPrice: Float
        description: String
        profit: Float
        percentage: Float
        date: String
    }

    type Stock {
        _id: ID
        userId: ID
        category: String
        subcategory: String
        product: String
        suplier: String
        quantity: Int
        price: Float
        total: Float
        costPrice: Float
        description: String
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        transferSale(saleInputTransfer: SaleInputTransfer): Sale
        reverseSale(saleInputTransfer: SaleInputTransfer): Stock
    }
`;
