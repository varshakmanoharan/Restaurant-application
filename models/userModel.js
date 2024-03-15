const mongoose = require('mongoose')

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    address: [{
        type: String,
        required: true
    }],
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'client',
        enum:['client','admin','restaurant']
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMGDMsqOM26AzZ5Oo2Ue3p-Enk3Z8yd6aWq5WsonIkbQ&s'
    },
    },{
        timestamps:true
    })

    //export
    module.exports = mongoose.model('User',userSchema)