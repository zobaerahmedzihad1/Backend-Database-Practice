const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// username : dbuser
// password : Fb113kX58zQez04A

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://process.env.DATABASE_USER:process.env.DATABASE_PASSWORD@cluster0.rb00t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  console.log("connected WITH dot env.");
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready.");
});

app.listen(port, () => {
  console.log("Listening From ", port);
});
