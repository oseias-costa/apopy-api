module.exports =`#graphql

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
    }
    
    type Query {
        sales: [Sale]
    }
    
    type Mutation {
        transferSale(saleInput: SaleInput): Sale
        reverseSale(saleInput: SaleInput): Sale
    }
`
