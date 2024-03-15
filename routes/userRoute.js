const express = require("express");
const { getUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


//routes
//GET- user data
router.get('/getUser',authMiddleware,getUserController)

//UPDAATE - user data
router.put('/updateUser',authMiddleware,updateUserController)

module.exports = router;
