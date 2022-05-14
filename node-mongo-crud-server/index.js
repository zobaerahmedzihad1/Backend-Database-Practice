const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.rb00t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");

    // get
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // get one
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // post
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(`Send data to database: ${result.insertedId}`);
    });

    // delete
    app.delete("/user/:id", async (req, res) => {
      // console.log(req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);

      // update user.
      app.put("/user/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const updatedUser = req.body;
        console.log(updateUser);
        const filter = { _id: ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email,
          },
        };
        const result = await userCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      });

      // update user
      // app.put("/user/:id", async (req, res) => {
      //   const updateUser = req.body;
      //   console.log(updateUser);
      //   const id = req.params.id;
      //   console.log(id);
      // const filter = { _id: ObjectId(id) };
      // const options = { upsert: true };
      // const updateDoc = {
      //   $set: {
      //     updateUser,
      //   },
      // };

      // const result = await userCollection.updateOne(
      //   filter,
      //   updateDoc,
      //   options
      // );
      // res.send(result);
      // });
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is ready.");
});

app.listen(port, () => {
  console.log("Listening From ", port);
});
