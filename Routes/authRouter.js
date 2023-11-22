import express from 'express'
import {registerController,loginController,testController} from '../controller/authController.js'
import {isAdmin, requireSignIn } from '../middlewares/middleware.js'

//router object
const router= express.Router()


//routing
//Register || Method Post
router.post('/register', registerController)

//LOGGIN//POST
router.post('/login',loginController)

//test route
router.get('/test', requireSignIn , isAdmin, testController)

//protected route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})
export default router