const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createMenuController, getAllMenuController, getSingleMenuController, getMenuByResturantController, updateMenuController, deleteMenuController, placeOrderController, orderStatusController } = require("../controllers/menuController");
const restaurantMiddleware = require("../middlewares/restaurantMiddleware");

const router = express.Router();
//router
//create food menu -POST
router.post("/create",authMiddleware,createMenuController)

//get all menu
router.get("/getAll",getAllMenuController)

//get single food menu
router.get("/get/:id",getSingleMenuController)

// GET  FOOD Menu by restaurant
router.get("/getByResturant/:id", getMenuByResturantController);

//UPDATE FOOD menu
router.put("/update/:id", authMiddleware,updateMenuController)

//DELETE FOOD MENU
router.delete("/delete/:id",authMiddleware,deleteMenuController)
// PLACE ORDER
router.post("/placeorder",authMiddleware,placeOrderController);
// ORDER STATUS
router.post( "/orderStatus/:id",authMiddleware,orderStatusController);
    

module.exports = router;