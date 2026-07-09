const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Student = require("./models/listing");
const ejsMate = require("ejs-mate");
const app = express();
const port = 8080;

// using middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

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

// students route
app.get("/students", async (req, res) => {
  const allStudents = await Student.find({});
  // res.send(allStudents);
  res.render("index.ejs", {allStudents});
});

// new route
app.get("/students/new", (req, res) => {
  res.send("This is new route");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
