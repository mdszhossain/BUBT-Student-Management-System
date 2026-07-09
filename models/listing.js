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
    default:
      "https://media.licdn.com/dms/image/v2/D5603AQFO0bzX0uJPDg/profile-displayphoto-scale_400_400/B56Z27HMKZJgAk-/0/1776960720562?e=1785369600&v=beta&t=YXp2YrpjexuutVgzWuur6p_6XUl6wuvXsxCq3aX5Fh4",
    set: (v) =>
      v === ""
        ? "https://media.licdn.com/dms/image/v2/D5603AQFO0bzX0uJPDg/profile-displayphoto-scale_400_400/B56Z27HMKZJgAk-/0/1776960720562?e=1785369600&v=beta&t=YXp2YrpjexuutVgzWuur6p_6XUl6wuvXsxCq3aX5Fh4"
        : v,
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
  studentDept: {
    type: String,
    required: true,
  },
  studentIntake: {
    type: Number,
    required: true,
  },
  studentClassId: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
