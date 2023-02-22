require("dotenv/config");
const express = require("express")
const app = express();
const {ApolloServer} = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs")
const resolvers = require("./schema/resolvers")

app.use(express.json())
app.use(cors());


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
})

async function startServer () {
  await apolloServer.start();
  apolloServer.applyMiddleware({app})
  app.use("/", (req,res) => {
    res.send("salom")
  })
}

startServer();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB)
.then(() => console.log("MongoDb connected Succesful!"))
.catch((err) => console.log(`mongoDb connected error: ${err}`))

const port = process.env.PORT || 5000 
app.listen(port, () => {
  console.log(`app running ${port}`);
})