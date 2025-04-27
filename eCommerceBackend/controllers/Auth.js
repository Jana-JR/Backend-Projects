const User = require("../models/User");
const bcrypt=require('bcryptjs');
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");
//const PasswordResetToken = require("../models/PasswordResetToken");
 
exports.signup=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})

        if(existingUser){
            return res.status(400).json({"message":"User already exists"})
        }

        const hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body.password=hashedPassword

        const createdUser=new User(req.body)
        await createdUser.save()

        const secureInfo=sanitizeUser(createdUser)

        const token=generateToken(secureInfo)

        res.cookie('token',token,{
            sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
            maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
            httpOnly:true,
            secure:process.env.PRODUCTION==='true'?true:false
        })

        res.status(201).json(sanitizeUser(createdUser))
        

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error occured during signup, please try again later"})
    }
}

exports.login=async(req,res)=>{
    try {
        const existingUser=await User.findOne({email:req.body.email})

        if(existingUser && (await bcrypt.compare(req.body.password,existingUser.password))){

            const secureInfo=sanitizeUser(existingUser)

            const token=generateToken(secureInfo)


            res.cookie('token',token,{
                sameSite:process.env.PRODUCTION==='true'?"None":'Lax',
                maxAge:new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000))),
                httpOnly:true,
                secure:process.env.PRODUCTION==='true'?true:false
            })
            return res.status(200).json(sanitizeUser(existingUser))
        }

        res.clearCookie('token');
        return res.status(404).json({message:"Invalid Credentails"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Some error occured while logging in, please try again later'})
    }
}



exports.logout = async (req, res) => {
    try {
      res.clearCookie('token', {
        sameSite: process.env.PRODUCTION === 'true' ? 'None' : 'Lax',
        httpOnly: true,
        secure: process.env.PRODUCTION === 'true' ? true : false
      });
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error during logout' });
    }
  };

