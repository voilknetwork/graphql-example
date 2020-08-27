const express = require("express");
const http = require('http');
const router = require('./router/router');
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

require('dotenv').config();
require("isomorphic-fetch");
const mongoURI = process.env.MONGO_URL;

const server = http.createServer(app);
app.use(cors());
app.use(router);
// for file and photos
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

mongoose.connect(
    mongoURI, {   
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);
mongoose.connection.once("open", () => {
    console.log("connected to mongodb..");
});

server.listen(process.env.PORT || 4001, () => console.log(`Server has started.`));