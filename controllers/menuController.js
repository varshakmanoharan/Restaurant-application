const menuModel = require('./../models/menuModel')
const orderModel = require('./../models/orderModel')
// CREATE FOOD
const createMenuController = async (req, res) => {
    try {
      const {
        dishname,
        description,
        imageUrl,
        price,
        cusinetype,
        isAvailabe,
        restaurant,
        rating,
      } = req.body;
  
      if (!dishname || !description || !price || !restaurant) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      const newMenu = new menuModel({
        dishname,
        description,
        imageUrl,
        price,
        cusinetype,
        isAvailabe,
        restaurant,
        rating,
      });
  
      await newMenu.save();
      res.status(201).send({
        success: true,
        message: "New Food Item Created",
        newMenu,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in create menu api",
        error,
      });
    }
  };
  // GET ALLL FOOD MENU
const getAllMenuController = async (req, res) => {
    try {
        const menuItems = await menuModel.find({});
  
        if (!menuItems || menuItems.length === 0) {
          return res.status(404).send({
            success: false,
            message: "No food menu was found",
          });
        }
  
        res.status(200).send({
          success: true,
          totalFoods: menuItems.length,
          menu: menuItems,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in Get ALL Food menu API",
          error,
        });
    }
  };

  // GET SINGLE FOOD MENU
const getSingleMenuController = async (req, res) => {
    try {
      const menuId = req.params.id;
      if (!menuId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const menu = await menuModel.findById(menuId);
      if (!menu) {
        return res.status(404).send({
          success: false,
          message: "No menuItem Found with htis id",
        });
      }
      res.status(200).send({
        success: true,
        menu,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get SIngle Food API",
        error,
      });
    }
  };
  // GET FOOD MENU BY RESTURANT
const getMenuByResturantController = async (req, res) => {
    try {
      const restaurantId = req.params.id;
      if (!restaurantId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const menu = await menuModel.find({ restaurant:restaurantId });
      if (!menu) {
        return res.status(404).send({
          success: false,
          message: "No Food menu Found with this id",
        });
      }
      res.status(200).send({
        success: true,
        message: "menu found on restaurant",
        menu,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get SIngle Food API",
        error,
      });
    }
  };
  // UPDATE FOOD MENU
const updateMenuController = async (req, res) => {
    try {
      const menuID = req.params.id;
      if (!menuID) {
        return res.status(404).send({
          success: false,
          message: "no menu id was found",
        });
      }
      const menu = await menuModel.findById(menuID);
      if (!menu) {
        return res.status(404).send({
          success: false,
          message: "No Food menu Found",
        });
      }
      const {
        dishname,
        description,
        imageUrl,
        price,
        cusinetype,
        isAvailabe,
        restaurant,
        rating,
      } = req.body;
      const updatedMenu = await menuModel.findByIdAndUpdate(
        menuID,
        {
            dishname,
            description,
            imageUrl,
            price,
            cusinetype,
            isAvailabe,
            restaurant,
            rating,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Food Menu Was Updated",
        menu,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Update Food menu API",
        error,
      });
    }
  };
  // DELETE FOOD Menu
const deleteMenuController = async (req, res) => {
    try {
      const menuId = req.params.id;
      if (!menuId) {
        return res.status(404).send({
          success: false,
          message: "provide food menu id",
        });
      }
      const menu = await menuModel.findById(menuId);
      if (!menu) {
        return res.status(404).send({
          success: false,
          message: "No Foodmenu Found with this id",
        });
      }
      await menuModel.findByIdAndDelete(menuId);
      res.status(200).send({
        success: true,
        message: "Foodmenu item deleted ",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Delete Foodmenu APi",
        error,
      });
    }
  };
  //Place Order
const placeOrderController = async (req, res) => {
    try {
      const { cart} = req.body;
      if (!cart) {
        return res.status(500).send({
          success: false,
          message: "please check cart or payment method",
        });
      }
      let total = 0;
      //calculate
      cart.map((i) => {
        total += i.price;
      });
  
      const newOrder = new orderModel({
        menu: cart,
        payment: total,
        buyer: req.body.id,
      });
      await newOrder.save();
      res.status(201).send({
        success: true,
        message: "Order Placed successfully",
        newOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr In Place Order API",
        error,
      });
    }
  };
// CHANGE ORDER STATUS
const orderStatusController = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide valid order id",
        });
      }
      const { status } = req.body;
      const order = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Order Status Updated",
        order,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Order Status API",
        error,
      });
    }
  };
  
  module.exports = {createMenuController,
    getAllMenuController,
    getSingleMenuController,
    getMenuByResturantController,
    updateMenuController,
    deleteMenuController,
    placeOrderController,orderStatusController}