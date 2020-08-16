const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/", express.static("public"));
app.use("/indian", express.static("indian"));

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

app.listen(8000, () => {
  console.log("running");
});
