const mongoose = require('mongoose')

//schema
const menuSchema = new mongoose.Schema({
    dishname:{
        type:String,
        required:[true,'dishname name is required']
    },
    description:{
        type:String,
        required:[true,'description  is required']
    },
    imageUrl: {
    type: String,
    default:
          "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
      },
    price:{
        type: Number,
        required:[true,'price is required'],
    },
    cusinetype:{
        type:String,
        required:[true,'cusinetype is required'],
    },
    isAvailabe: {
        type: Boolean,
        default: true,
      },
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturant",
      },
    rating: {
        type: String,
        default: 5,
        min: 1,
        max: 5,
      },
      ratingCount: {
        type: String,
      },
      
    },{
        timestamps:true
    })

    //export
    module.exports = mongoose.model('Menu',menuSchema)