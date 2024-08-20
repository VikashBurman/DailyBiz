const mongoose = require('mongoose');
// this code defines a Mongoose schema and model for a User collection in MongoDB. The User schema includes username and password fields with specific validation rules and constraints. The model is then exported for use in other modules.
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
 