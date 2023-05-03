const gql = require('graphql-tag')

const typeDefs = gql`
    type User {
        id: ID
        name: String
        email: String
        password: String
        phone: String
        token: String

    }

    type Product {
        id: ID
        category: String
        suplier: String
        description: String
        #name: String
        #category: [Category]
        #subcategory: [Subcategory]
    }

    type Category {
        id: ID
        name: String
        subcategory: [Subcategory]
    }

    type Subcategory {
        id: ID
        name: String
        category: [Category]
    }


    type Query {
        users: [User]
        user(id: ID!): User
        products: [Product]
        
    }

    input RegisterInput {
        name: String
        email: String
        password: String
        phone: String
    }

    input LoginInput {
        email: String
        password: String
    }

    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
    }
`

module.exports = typeDefs