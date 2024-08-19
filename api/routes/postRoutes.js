const express = require("express");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/post", uploadMiddleware.single("file"), createPost);
router.get("/post", getAllPosts);
router.get("/post/:id", getPostById);
router.put("/post", uploadMiddleware.single("file"), updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;
