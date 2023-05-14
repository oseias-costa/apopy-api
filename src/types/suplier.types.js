module.exports = `#graphql
    type Suplier {
        name: String
        userId: ID
        _id: ID
    }
    
    input SuplierInput {
        name: String
        userid: ID
        _id: ID
    } 
    
    type Query {
        suplier(id: ID): Suplier
        supliers: [Suplier]
        Suplier(id: ID): Suplier
    }
    
    type Mutation {
        createSuplier(suplierInput: SuplierInput): Suplier
        updateSuplier(suplierInput: SuplierInput): Suplier
        deleteSuplier(_id: ID): Suplier
    }
`