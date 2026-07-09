const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/listing");
const app = express();
const port = 8080;

// using middlewares

// database connection
const MONGO_URL = "mongodb://127.0.0.1:27017/bubt";
main()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error Appeared: ", err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

// root route
app.get("/", (req, res) => {
  console.log("Hello, This is root route");
  res.redirect("/students");
});

app.get("/students", async(req, res) => {
  const allStudents = await Student.find({});
  res.send(allStudents);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
