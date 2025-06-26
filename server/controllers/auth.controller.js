const  User =  require("../models/user.model");
const { getUserById, validateUserPassword, generateAuthToken } = require("../util/userUtility");

const register = async (req, res) => {
  try {
    const { userName, password, verifyPassword, name } = req.body;
    let role = req.body.role
    console.log('role',role)
    if(!role){
      role="User"
    }

    if (!userName || !password || !verifyPassword || !name || !role) {
      return res.status(400).send({
        message: "Field can't be empty",
      });
    }

    if (password !== verifyPassword) {
      return res.status(400).send({
        message: "Password doesn't match",
      });
    }
    const userDetails = await User.findOne({ userName: userName });
    if (userDetails) {
      return res.status(400).send({
        message: "UserName already Taken",
      });
    }

    const newUser = new User({
      userName,
      password,
      name,
      role
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
    return res.status(201).send({
      message: "User Register successFully",
    });
  } catch (error) {
    console.log('error',error)
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log("Invalid credentia",req.body)
    if (!userName || !password) {
    console.log("Invalid credentia",req.body)
      return res.status(400).send({
        message: "Invalid Credential",
      });
    }
    const checkExistingUser = await getUserById(userName);
    const isMatch = await validateUserPassword(userName, password);
    if (!checkExistingUser || !isMatch) {
      res.status(403).json({ message: "userName and password did not match" });
      return;
    }
    const token = await generateAuthToken(userName);
    console.log("checking userid", token);
    if (!token) {
      return res.status(500).json({ message: "could not login in user" });
    }

    return res.status(200).json({
      token,
      role: checkExistingUser.role,
      userName: checkExistingUser.userName
    });
  } catch (error) {
    console.log('error',error)
      return res.status(500).json({ message: "Something went wrong" });

  }
};


module.exports = { register, login };