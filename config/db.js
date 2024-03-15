const mongoose = require('mongoose')
const colors = require('colors')
//database connection func 
const connectDB = async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to DB ${mongoose.connection.host}`.bgWhite);
} catch (error) {
    console.log('DB error',error,colors.bgRed);
}
}

module.exports = connectDB