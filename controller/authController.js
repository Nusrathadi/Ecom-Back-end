import User from "../Models/userModel.js";
import { comparePassword, hashPassword } from "../helper/userHelper.js";
import  jwt  from "jsonwebtoken";


export const registerController=async(req,res)=>{
   try {
     const {firstName,email,password,phone,address} = req.body;
     //validations
     if(!firstName){
        return res.send({message:'firstName is required'})
     }
     if(!email){
        return res.send({message:'Email is required'})
     }
     if(!password){
        return res.send({message:'password is required'})
     }
     if(!phone){
        return res.send({message:'phone is required'})
     }
     if(!address){
        return res.send({message:'address is required'})
     }

     //check user
     const existingUser= await User.findOne({email})
   //existing user
     if(existingUser){
       return res.status(200).json({
            success:false,
            message:'User already exist Please login'
            
        })
     }

     //register user
     const hashedPassword = await hashPassword(password)

     //save
     const newUser=await new User({
        firstName,
        email,
        password:hashedPassword,
        phone,
        address,
        
     })
     await newUser.save()
     res.status(201).json({
        success:true,
        message:"user register successfully",
        newUser
     })
   } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in registration",
            error

        })
   }
}

// ******************POST login ******

export  const loginController =async(req ,res)=>{
 try{
    const {email,password}=req.body;
    //validation
    if(!email || !password){
        return res.status(404).json({
            success:false,
            message:"Invalid email or password"
        })
    }
    //check user
    const user =await User.findOne({email})
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Email is not registered"
        })
    }
    const match= await comparePassword(password,user.password)
    if(!match){
        return res.status(200).json({
            success:false,
            message:"Invalid password"
        })
    }
    //token
    const token= await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).json({
        success:true,
        message:"login succesfully",
        user:{
            _id:user._id,
            name:user.firstName,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
        },token
    });


 }catch (error){
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Error in login",
        error
    })
 }
}

export const testController = (req,res) => {
  res.json('protected routes')
}