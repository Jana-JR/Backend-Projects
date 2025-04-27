require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')

const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")

//routes
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const uploadRoute = require("./routes/Upload");
const { connectToDB } = require("./database/db")
const User = require("./models/User")
const bcrypt=require('bcryptjs');
const path = require("path");


// server init
const app=express()

// database connection
connectToDB()

async function createInitialAdmin() {
    try {
      const adminExists = await User.findOne({ isAdmin: true });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const admin = new User({
          name: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          isAdmin: true,
          password: hashedPassword,
        });
        await admin.save();
        console.log('Initial admin user created');
      }
    } catch (error) {
      console.error('Error creating initial admin user:', error);
    }
  }
  
  createInitialAdmin();

app.use("/assets/uploads", express.static(path.normalize(path.join(__dirname, "./assets/uploads"))));



// middlewares
app.use(express.urlencoded({extended: false}))
app.use(cors({origin:process.env.ORIGIN,credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("tiny"))

// routeMiddleware
app.use("/auth",authRoutes)
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use("/orders",orderRoutes)
app.use("/cart",cartRoutes)
app.use("/brands",brandRoutes)
app.use("/address",addressRoutes)
app.use("/upload", uploadRoute);

app.get('/', (req, res) => {
    res.send('NODE API is running')
})

mongoose.set("strictQuery", false)

const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`Node API app is running on port ${port}`)
});
