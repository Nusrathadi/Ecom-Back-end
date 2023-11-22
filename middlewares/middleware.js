import JWT from 'jsonwebtoken'
import User from '../Models/userModel.js'
import { response } from 'express'

//protected route token based
export const requireSignIn =(req,res,next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode;
        next()
    } catch (error) {
        console.log(error)
    }

}

//admin access
export const isAdmin = async(req,res,next)=> {
    try {
        const user = await User.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).json({
                success:false,
                message:"unauthorized acccess"
            })
        }
        else{
            next()
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            error,
            message:"Error in admin middleware"
        })
    }

}