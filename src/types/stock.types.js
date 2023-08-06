module.exports = `#graphql

    type Stock {
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
    }

    type Query {
        stock: [Stock]
    }

    input StockItem {
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
        createAt: String
    }

    type Mutation {
        createStockItem(stockItem: StockItem): Stock
        editStockItem(stockItem: StockItem): Stock
        deleteStockItem(id: ID ): Stock
    }
`;
