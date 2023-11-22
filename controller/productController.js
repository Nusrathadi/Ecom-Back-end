import slugify from "slugify"
import Products from "../Models/productModel.js"
import fs from 'fs'
import Category from '../Models/categoryModel.js'

export const createProductController = async(req,res) =>{
try {
    const {name,slug,description,price,category,quantity,shipping} =req.fields
    const {photo} =req.files
     //validation
     switch(true){
        case !name:
            return res.status(500).json({error:"Name is required"})
        case !description:
            return res.status(500).json({error:"Description is required"})
        case !price:
            return res.status(500).json({error:"price is required"})
        case !category:
            return res.status(500).json({error:"category is required"})
        case !quantity:
            return res.status(500).json({error:"quantity is required"})
        case photo && photo.size > 100000:
            return res.status(500).json({error:"photo is required and should be less than 1mb"})
        }
        const products = new Products({...req.fields,slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save()
        res.status(200).json({
            success:true,
            message:"Product created successfully",
            products
        })
} catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        error,
        message:"Error in creating Product"
    })
}
}
 //==========get product controller
 export const getProductController =async(req,res) =>{
   try {
        const products = await Products.find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
       res.status(200).json({
        success:true,
        countTotal:products.length,
        message:"All products",
        products,
       })
    
   } catch (error) {
     console.log(error)
     res.status(500).json({
        success:false,
        message:"Error in getting products",
        error
     })
   }
 }

 //get single product

 export const getSingleProductController = async(req,res)=>{
    try {
        const {slug}=req.params
        const products= await Products.findOne({slug})
        .select("-photo")
        .populate("category")
        res.status(200).json({
            success:true,
            message:"single Product fetched",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Error while getting single product",

        })
    }

 }

 //======get photo controller

 export const productPhotoController = async (req, res) => {
    try {
      const product = await Products.findById(req.params.pid).select("photo");
      if (product.photo.data) {
        res.set("Content-type", product.photo.contentType);
        return res.status(200).send(product.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };
  
  //===delete product 
  export const deleteProduct = async(req,res)=>{
   try {
     await Products.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).json({
        success:true,
        message:"product deleted succesfully"
    })
     
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Error while deleting product",
        error
    })
   }
  }

  //update product
  export const updateProductController = async(req,res) =>{
    try {
        const {name,slug,description,price,category,quantity,shipping} =req.fields
        const {photo} =req.files
         //validation
         switch(true){
            case !name:
                return res.status(500).json({error:"Name is required"})
            case !description:
                return res.status(500).json({error:"Description is required"})
            case !price:
                return res.status(500).json({error:"price is required"})
            case !category:
                return res.status(500).json({error:"category is required"})
            case !quantity:
                return res.status(500).json({error:"quantity is required"})
            case photo && photo.size > 100000:
                return res.status(500).json({error:"photo is required and should be less than 1mb"})
            }
            const products = await Products.findByIdAndUpdate(
                req.params.pid,
                { ...req.fields, slug: slugify(name) },
                { new: true }
              );
              if (photo) {
                products.photo.data = fs.readFileSync(photo.path);
                products.photo.contentType = photo.type;
              }
              await products.save();
              res.status(201).send({
                success: true,
                message: "Product Updated Successfully",
                products,
              });
            } catch (error) {
              console.log(error);
              res.status(500).send({
                success: false,
                error,
                message: "Error in Updte product",
              });
            }
          };

          //filters
          export const productFiltersController = async(req,res) =>{
           try {
            const {checked,radio} = req.body
            let args ={}
            if(checked.length >0) args.category = checked
            if(radio.length ) args.price = {$gte:radio[0], $lte:radio[1]}
            const products = await Products.find(args)
            res.status(200).json({
              success:true,
              products
            })

           } catch (error) {
             console.log(error)
             res.status(400).json({
              succes:false,
              message:"Error while filtering products",
              error
             })
           }
          }

          //product count
          export const productCountController = async (req,res) =>{
            try {
              const total = await Products.find({}).estimatedDocumentCount()
              res.status(200).json({
                success:true,
                total
              })

            } catch (error) {
              console.log(error)
              res.status(500).json({
                success:false,
                message:"Error in product count",
                error

              })
            }

          }

          //product list base on pagination
          export const  productListController = async(req,res) =>{
             try {
              const perPage =6
              const page = req.params.page ? req.params.page : 1
              const products = await Products.find({})
              .select("-photo")
              .skip((page-1)*perPage)
              .limit(perPage)
              .sort({createdAt:-1})
              res.status(200).json({
                success:true,
                products
              })

             } catch (error) {
              console.log(error)
              res.status(400).json({
                success:false,
                message:"Error in per page",
                error
              })
             }

          }

    //search product
    export const  searchProductController = async(req,res) =>{
      try {
        const {keyword} = req.params
        const results = await Products.find({
          $or :[
            {name:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}}
          ]
        }).select("-photo")
        res.json(results)
        
      } catch (error) {
        
        console.log(error)
        res.status(400).json({
          success:false,
          message:"Error in search Product API",
          error
        })
      }
    }

    //similar product 
    export const realtedProductController = async(req,res)=>{
      try {
        const {pid,cid}=req.params
        const products= await Products.find({
          category:cid,
          _id:{$ne:pid}
        }).select("-photo")
        .limit(3)
        .populate("category")
        res.status(200).json({
          success:true,
          products
        })
        
      } catch (error) {
        console.log(error)
        res.status(400).json({
          success:false,
          message:"Error in getting related product",
          error
        })

      }

    }