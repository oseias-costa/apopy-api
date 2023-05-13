module.exports = `#graphql
  type User {
    _id: ID
    name: String
    email: String
    password: String
    phone: String
    createAt: String
    token: String
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
  
  type Query {
    users: [User]
    user(id: ID!): User
  }
    
  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
