const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
    type: String,
    min:4,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
})

const UserModel = new mongoose.model('User',UserSchema);

module.exports = UserModel;
 