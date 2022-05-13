const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: "1", name: "zihad" },
  { id: "2", name: "jewel" },
  { id: "3", name: "md sahin" },
  { id: "4", name: "md masum" },
  { id: "5", name: "shiplu" },
  { id: "6", name: "bellal" },
];
app.get("/users", (req, res) => {
  // console.log('query ',req.query);
  // filter by query parameter.
  if (req.query.name) {
    const search = req.query.name.toLocaleLowerCase();
    const matched = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(search)
    );
    res.setTimeout(matched);
  } else {
    res.send(users);
  }
});

app.post("/user", (req, res) => {
  // console.log(req.body);
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  res.send(user);
});

app.listen(port, () => {
  console.log("Listening From ", port);
});
