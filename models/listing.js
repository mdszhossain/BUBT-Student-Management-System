const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentImage: {
    type: String,
    required: true,
  },
  studentAge: {
    type: Number,
    required: true,
  },
  studentFatherName: {
    type: String,
    required: true,
  },
  studentMotherName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentContact: {
    type: String,
    required: true,
  },
  studentGuardianContact: {
    type: String,
    required: true,
  },
  studentMailingAddress: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
