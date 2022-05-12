const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hey mama I'm from server.");
});

app.listen(port, () => {
  console.log("Listening From ", port);
});
