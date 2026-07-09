const mongoose = require("mongoose");
const initData = require("./data.js");
const Student = require("../models/listing.js");

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

const initDB = async() => {
    await Student.deleteMany({});
    await Student.insertMany(initData.data);
    console.log("Database Initialized");
};

initDB();