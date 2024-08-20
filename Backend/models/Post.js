const mongoose = require("mongoose");
const {Schema} = mongoose;
// creates a model for the "Post" collection based on the PostSchema.
const PostSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    //cover->image
    cover: String,
    author:{type:Schema.Types.ObjectId,ref:'User'},
  },
  {
    //The timestamps: true option automatically adds createdAt and updatedAt fields to the documents in the collection.
    timestamps: true,
  }
);

const PostModel = new mongoose.model("Post", PostSchema);

module.exports = PostModel;
