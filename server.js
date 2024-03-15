const express = require("express")
const colors = require("colors")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connectDB = require('./config/db')


//dotenv config
dotenv.config();

//db connection
connectDB();

// rest obj
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//route
app.use('/api/v1/test',require('./routes/testRoute'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRoute'))
app.use('/api/v1/restaurant',require('./routes/RestaurantRoute'))
app.use('/api/v1/menu',require('./routes/menuRoute'))
app.get('/',(req,res)=>{
    return res.status(200).send("<h>Welcome to Restaurant App server</h>")
});

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan);
});
