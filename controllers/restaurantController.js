
const restaurantModel = require('../models/restaurantModel');
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createRestaurantController = async(req,res) => {
  try {
    // Validation
    const { title, email, password,phone, ownername, address } = req.body;

    if (!title || !ownername || !email || !password || !phone || !address) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }
     //check restaurant
     const existing = await restaurantModel.findOne({ email });
     if (existing) {
       return res.status(500).send({
         success: false,
         message: 'Email already Registered. Please Login'
       });
     }
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRestaurant = new restaurantModel({
        title, email, password: hashedPassword,phone, ownername, address
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "Restaurant Registration success",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Restaurant Registration Failed",
    });
  }
}// LOGIN
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
  
      // Check restaurant
      const restaurant = await restaurantModel.findOne({ email });
  
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, restaurant.password);
  
      if (!isMatch) {
        return res.status(500).json({
          success: false,
          message: "Invalid Credentials",
        });
      }
      // token
      const token = JWT.sign({ id:restaurant._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        restaurant,
      });
    } catch (error) {
      console.error("Error in Login API", error);
      res.status(500).json({
        success: false,
        message: "Error in Login API",
        error,
      });
    }
}

//GET restaurant info
const getRestaurantController = async (req, res) =>{
    try {
        //find restaurant
            const restaurant = await restaurantModel.findById({_id:req.body.id});
        //validation
        if(!restaurant){
            return res.status(404).send({
                success : false,
                message : "Restaurant not found"
            });
        }
        res.status(200).send({
            success : true,
            message :"Restaurant details",
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in GET restaurant",error,
        })
    }
}
//Update restaurant info
const updateRestaurantController = async (req,res)=>{
    try {
        const restaurant= await restaurantModel.findById({_id:req.body.id})
        //validation
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message:"Restaurant not found" 
            })
        }
         //UPDATE
         const {title, address, phone} = req.body
        if(title) restaurant.title = title
        if(address)  restaurant.address  = address
        if(phone) restaurant.phone = phone
        //save restaurant
        await restaurant.save()
        res.status(200).send({
            success: true,
            message : "Restaurant details updated",restaurant,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message : "Error updating restaurant details"
        })
    }

}
const  deleteResturantController = async (req, res) => {
    try {
      const restaurantId = req.params.id;
  
      if (!restaurantId) {
        return res.status(404).json({
          success: false,
          message: "No Restaurant Found or Provide Restaurant ID",
        });
      }
  
      // Check if the restaurant exists
      const restaurant = await  restaurantModel.findById(restaurantId);
  
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
  
      // Delete the restaurant
      await restaurantModel.findByIdAndDelete(restaurantId);
  
      res.status(200).json({
        success: true,
        message: "Restaurant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error in delete restaurant API",
        error,
      });
    }
  };
module.exports = { createRestaurantController,loginController,getRestaurantController,updateRestaurantController,deleteResturantController};
