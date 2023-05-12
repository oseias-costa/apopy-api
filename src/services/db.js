const MongoClient = require("mongodb").MongoClient;

const MONGODB =
  "mongodb+srv://oseiasc2:j3qqlbCc4YFFqnAP@apopydb.e92lo9p.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGODB);
async function ConnectedMongoDB() {
  try {
    const cone = await client.connect();
    const res = cone.db("test").listCollections();
    console.log(res);
  } catch {
    console.log("error conectar mongo");
  }
}

module.exports = { ConnectedMongoDB };
