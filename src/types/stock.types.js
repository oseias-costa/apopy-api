
module.exports = `#graphql
    type Stock {
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

    type Mutation {
        createStockItem(stockItem: StockItem): Stock
    }
`