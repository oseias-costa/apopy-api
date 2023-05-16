
module.exports = `#graphql
    type Stock {
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
    }
`
// Stock
// - Vendas
// - Perda
// - Devolução