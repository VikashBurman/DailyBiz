const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE;

const mongoURI = `${DATABASE}`;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    // console.log(DATABASE);

    console.log("DB Connected👍");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectToMongoDB;
