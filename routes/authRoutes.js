const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();


//router- Register || POST
router.post("/register",registerController);

//router -Login || POST
router.post("/login",loginController);

module.exports = router;
