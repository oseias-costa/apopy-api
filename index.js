const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer }  = require('@apollo/server/standalone');
const { default: mongoose } = require('mongoose');
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolvers/users')
const jwt = require('jsonwebtoken')

const MONGODB = "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority"

async function StartApolloServer(){
    const server = new ApolloServer({ typeDefs,resolvers })

    await mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(console.log('MongoDB Connected'))

    const { url } = await startStandaloneServer(server, {
        context: ({ req }) => {
            const token = req.headers.authorization || null
            
            if(token){
                const user = jwt.verify(token, "unsafe")
                return { user }
            } else {
                return { user: null }
            }
            // if (!token)
            // throw new GraphQLError('User is not authenticated', {
            //     extensions: {
            //     code: 'UNAUTHENTICATED',
            //     http: { status: 401 },
            //     },
            // });
            // if(!user) {
            //     throw new GraphQLError('User is not authenticated')
            //  } 
        },
        listen: { port: 4000 }
    })
    console.log(`
        🚀 Running ApolloServer
        📬 On url: ${url}
    `)
}

StartApolloServer()