const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require('../middleware/VerifyToken')

router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .get('/logout',authController.logout)


module.exports=router