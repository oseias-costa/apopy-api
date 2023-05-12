const { MongoClient } = require('mongodb')


async function ConnectedMongoDB() {
    const MONGODB = "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority"
    MongoClient.connect(MONGODB, async function(err, db){
        const user = await db.collection('users').find({})
        return console.log('mongodb is connected client', user)
    })
}

async function listCollections(client){
    const collections = await client.db("apopydb").collection("users").find({})
    console.log(collections)
}


module.exports = { ConnectedMongoDB }