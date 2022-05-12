const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const users = [
  { id: "1", name: "zihad" },
  { id: "2", name: "jewel" },
  { id: "3", name: "sahin" },
  { id: "4", name: "masum" },
  { id: "5", name: "shiplu" },
  { id: "6", name: "bellal" },
];
app.get("/", (req, res) => {
  res.send("Hey mama I'm from server.");
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  //   const user = users[id];
  const user = users.find((user) => user.id === id);
  res.send(user);
});

app.listen(port, () => {
  console.log("Listening From ", port);
});
