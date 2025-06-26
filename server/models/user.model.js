const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { USER_ROLE, DEFAULT_USER_ROLE } = require('../constants/roleConstant');
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const JWT_SECRET =  process.env.JWT_SECRET;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  role: {
    type: String,
    enum: USER_ROLE,
    default: DEFAULT_USER_ROLE,
  },
}, {
  timestamps: true
});

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      userName: this.userName,
      role: this.role,
      id: this._id,
    },
    JWT_SECRET,
    { expiresIn: "5h" }
  );
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
