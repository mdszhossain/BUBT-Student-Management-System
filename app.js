const express = require("express");
const app = express();
const port = 8080;

// root route
app.get("/", (req, res) => {
  console.log("Hello, This is root route");
  res.send("This is root route");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
