const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//salt is a predefined salt value used to enhance password security
const salt = bcrypt.genSaltSync(10);
const secret = "qwertyuiuytrtyuioiuyt";
const mongoURI =
  "mongodb+srv://vikasburman37:OG50TLaYMUgsQD6E@cluster0.nfs4qob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
//This is middleware that you use in your Express application to handle CORS It allows you to specify which origins are allowed to access your server's resources.
//Without CORS: Requests from a different origin will be blocked by the browser,
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// Automatically parses JSON data in incoming requests so you can work with it easily.
app.use(express.json());
//Makes it easy to read and manage cookies sent with requests.
app.use(cookieParser());

//Connecting to MongoDB Atlas
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("DataBase Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connectToMongoDB();

app.post("/register", async (req, res) => {
  // : Destructures the username and password fields from the request body (req.body).
  const { username, password } = req.body;
  try {
    // Attempts to create a new user document in the database with the provided username and password.
    const userDoc = await User.create({
      username,
      //Hashes the password from the request body using bcrypt to ensure it is securely stored in the database.
      password: bcrypt.hashSync(password, salt),
      //Synchronously hashes the password using a salt. salt is a predefined salt value used to enhance password security.
    });
    // Sends the created user document back to the client as a JSON response.
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //searches for a user document in the database with the given username.
  const userDoc = await User.findOne({ username });
  //Uses bcrypt to compare the provided password with the hashed password stored in the user document
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    //JWTs make it easy and secure to handle user authentication and authorization without needing to store session data on the server.
    // Creates a JSON Web Token (JWT) Payload: Contains username and id of the user.
    // Secret: A secret key used to sign the token.
    // Callback: Receives an error (err) and the signed token (token).
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      // res.json(token);
      // Sets a cookie named token with the JWT and sends a JSON response with 'ok'.
      res.cookie("token", token).json("ok");
      //In your login endpoint, the JWT is created upon successful authentication and sent to the client as a cookie, enabling the client to include the token in subsequent requests to verify the user's identity and access rights.
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000, () => {
  console.log("Server Started");
});
