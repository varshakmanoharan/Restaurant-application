const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, loginController, getRestaurantController, updateRestaurantController, deleteResturantController } = require("../controllers/restaurantController");


const router = express.Router();

//router
//create restaurant -POST
router.post("/create",createRestaurantController)

router.post("/login",loginController)
//GET- restaurant data
router.get('/getRestaurant',authMiddleware,getRestaurantController)

//UPDATE -restaurant data
router.put('/updateRestaurant',authMiddleware,updateRestaurantController)
//DELETE -restaurant data
router.delete('/deleteRestaurant/:id',authMiddleware,deleteResturantController)
module.exports = router;
