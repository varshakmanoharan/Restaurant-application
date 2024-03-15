const mongoose = require('mongoose')

//schema
const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Restaurant name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    phone:{
        type:String,
        required:[true,'password is required'],
    },
    ownername:{
        type:String,
        required:[true,'Restaurant name is required']
    },
    address: {
        type: String,
        required: [true, 'address is required']
      },
      usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'restaurant',
        enum:['client','restaurant']
    },
    },{
        timestamps:true
    })

    //export
    module.exports = mongoose.model('Restaurant',restaurantSchema)