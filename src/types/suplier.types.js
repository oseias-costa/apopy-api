module.exports = `#graphql
    type Suplier {
        name: String
        userId: ID
    }
    
    input SuplierInput {
        name: String
        userid: ID
    } 
    
    type Query {
        suplier(id: ID): Suplier
        supliers: [Suplier]
    }
    
    type Mutation {
        createSuplier(suplierInput: SuplierInput): Suplier
        updateSuplier(suplierInput: SuplierInput): Suplier
        deleteSuplier(ID): Suplier
    }
`