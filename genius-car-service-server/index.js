const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cli = require("nodemon/lib/cli");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// verify jwt
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    res.status(401).send({ message: "Unauthorized access." });
  }
  const token = authHeader.split(" ")[1];
  // console.log(token);
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decode) => {
    if (err) {
      res.status(403).send({ message: "Forbidden access." });
    }
    req.decode = decode;
    // console.log(decode);
    next();
  });
}

// function verifyJWT(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).send({ message: "Unauthorized access ." });
//   }
//   const token = authHeader.split(" ")[1];
//   // console.log("only token", token);
//   jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({ message: "Forbidden access." });
//     }
//     // console.log(decoded, 'decoded');
//     req.decoded = decoded;
//     next();
//   });
// }

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.rb00t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("geniusCar").collection("service");
    const orderCollection = client.db("geniusCar").collection("order");

    // auth jwt
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accessToken = await jwt.sign(
        user,
        process.env.SECRET_ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      res.send({ accessToken });
    });

    // load all services
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // post single service
    app.post("/service", async (req, res) => {
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.send(result);
    });

    // load single service by id
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // delete
    app.delete("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });

    //  order collection api
    // get orders data
    app.get("/order", verifyJWT, async (req, res) => {
      const decodedEmail = req.decode.email;
      // console.log(decodedEmail);
      const email = req.query.email;
      if (decodedEmail === email) {
        const query = { email: email };
        const cursor = orderCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      }
    });

    // post order data
    app.post("/order", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
  } finally {
    // client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is fully ready.");
});

app.listen(port, () => {
  console.log("Listening the port", port);
});
