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

// students route — supports search by name, intake, department, and classId
app.get("/students", async (req, res) => {
  const { studentName, studentIntake, studentDept, studentClassId } = req.query;

  // Build a query object only with the fields that were provided
  const query = {};

  if (studentName && studentName.trim() !== "") {
    query.studentName = { $regex: studentName.trim(), $options: "i" }; // this is for search with any prefixes
    // query.studentName = studentName;
  }
  if (studentIntake && studentIntake.trim() !== "") {
    query.studentIntake = Number(studentIntake.trim());
    // query.studentIntake = Number(studentIntake);
  }
  if (studentDept && studentDept.trim() !== "") {
    query.studentDept = { $regex: studentDept.trim(), $options: "i" };
    // query.studentDept = studentDept;
  }
  if (studentClassId && studentClassId.trim() !== "") {
    query.studentClassId = { $regex: studentClassId.trim(), $options: "i" };
    // query.studentClassId = studentClassId;
  }

  const allStudents = await Student.find(query);
  res.render("index.ejs", { allStudents, query: req.query });
});

// new route
app.get("/students/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/students", async (req, res) => {
  const newStudent = new Student(req.body.newStudent);
  await newStudent.save();
  res.redirect("/students");
});

app.delete("/students/:id", async (req, res) => {
  let { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.redirect("/students");
});

// show route
app.get("/students/:id", async (req, res) => {
  let { id } = req.params;
  let student = await Student.findById(id);
  res.render("show.ejs", { student });
});

// edit route
app.get("/students/:id/edit", async (req, res) => {
  let { id } = req.params;
  const student = await Student.findById(id);
  res.render("edit.ejs", { student });
});

app.patch("/students/:id", async (req, res) => {
  let { id } = req.params;
  const newStudent = req.body.newStudent;
  console.log(newStudent);
  await Student.updateOne({ _id: id }, newStudent, { new: true });
  res.redirect("/students");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
