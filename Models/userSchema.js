const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  captianName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  coachName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ['admin', 'team', 'association'],
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
});

const users = mongoose.model('users', userSchema);
module.exports = users;
