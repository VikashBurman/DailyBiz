const express = require("express");
require('dotenv').config();
const cors = require("cors");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const Post = require("./models/Post");
const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
const ConnectMongoDB = require("./config/db");

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

ConnectMongoDB();

app.use("/", authRoutes);
app.use("/", postRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Working at ${PORT}`);
});