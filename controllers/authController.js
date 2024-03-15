const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require("jsonwebtoken");
const registerController = async (req,res) => {
try {
    const{userName,email,password,phone,address} = req.body
   // Validation
if (!userName || !email || !password || !phone || !address) {
  return res.status(400).send({
    success: false,
    message: 'Please provide all fields'
  });
}
    //check user
    const existing = await userModel.findOne({ email });
if (existing) {
  return res.status(500).send({
    success: false,
    message: 'Email already Registered. Please Login'
  });
}
//hashing password
var salt = bcrypt.genSaltSync(10);
const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const user = await userModel.create(
      {
        userName,
        email,
        password: hashedPassword,
        address,
        phone})
    res.status(201).send({
        success: true,
        message: 'Registration Successfull',user,
    });
} catch(error) {
    console.log(error);
    res.status(500).send({
        success: false,
        message:'Error in  Register API',
        error,
    })
}
}
// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // user.password = undefined;
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Error in Login API", error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
