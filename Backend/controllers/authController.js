const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "qwertyuiuytrtyuioiuyt";

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const userDoc = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: userDoc._id, username: userDoc.username },
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json("User not found");
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Error signing token" });
      }
      res.cookie("token", token, { httpOnly: true });
      res.json({ id: userDoc._id, username });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
};

exports.profile = (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.json(info);
  });
};

exports.logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) }).json("Logout Successfully");
};
