import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/middleware.js'
import { createProductController,
     deleteProduct, 
     getProductController,
      getSingleProductController,
       productCountController,
       productFiltersController,
       productListController,
       productPhotoController, 
       realtedProductController, 
       searchProductController, 
       updateProductController} from '../controller/productController.js'
import formidable from 'express-formidable'

const router=express.Router()

//create product router
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController) 

//update product router
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController) 

//get Products
router.get("/get-product",getProductController)

//single Products
router.get("/get-product/:slug",getSingleProductController)

//get photo
router.get("/product-photo/:pid",productPhotoController)

//delete photo
router.delete("/delete-product/:pid",deleteProduct)

//filter product
router.post('/product-filters',productFiltersController)

//product count
router.get("/product-count",productCountController)

//product per page
router.get("/product-list/:page",productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

export default router