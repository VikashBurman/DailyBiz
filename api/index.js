const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./models/Post");

const authRoutes = require("./routes/authRoutes");

const ConnectMongoDB = require("./config/db");


//salt is a predefined salt value used to enhance password security
const salt = bcrypt.genSaltSync(10);
const secret = "qwertyuiuytrtyuioiuyt";

const app = express();
//This is middleware that you use in your Express application to handle CORS It allows you to specify which origins are allowed to access your server's resources.
//Without CORS: Requests from a different origin will be blocked by the browser,
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// Automatically parses JSON data in incoming requests so you can work with it easily.
app.use(express.json());
//Makes it easy to read and manage cookies sent with requests.
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

ConnectMongoDB();

app.use("/", authRoutes);

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  // console.log(req.file)
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  // This contains all the cookies sent by the client (e.g., the browser) with the request.
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    //f the token is valid, info will contain the decoded information from the JWT payload, such as the user's id and username.
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;

  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      },
      { new: true } // Return the updated document
    );

    res.json(updatedPost);
  });
});

app.listen(4000, () => {
  console.log("Server Started");
});
