import express from 'express'
const router =express.Router()
import { isAdmin, requireSignIn } from '../middlewares/middleware.js'
import { categoryController, createCategoryController, deletecategory, singleCategoryController, updateCategoryController } from '../controller/categoryController.js'


//routes
//create category routes
router.post("/create-category",requireSignIn,isAdmin,createCategoryController)
//update category
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController)
//getall category
router.get('/getallcategories',categoryController)
//get single category
router.get('/single-category/:slug',singleCategoryController)

//delete category route
router.delete('/delete-category/:id',requireSignIn ,isAdmin,deletecategory)


export default router