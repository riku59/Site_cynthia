const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Api création cynthia",
  });
});

const users = require("./routes/users");
app.use("/users", users);

app.listen(port, () => {
  console.log("serveur en ligne");
});
