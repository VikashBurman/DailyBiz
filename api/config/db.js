const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://vikasburman37:OG50TLaYMUgsQD6E@cluster0.nfs4qob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Connecting to MongoDB Atlas
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DataBase Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectToMongoDB;
