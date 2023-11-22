import Category from "../Models/categoryModel.js"
import slugify from "slugify"

export const createCategoryController = async(req,res) =>{
    try {
        const {name} =req.body
        if(!name){
            return res.status(401).json({message:"Name is required"})
        }
        const existingCategory = await Category.findOne({name})
        if(existingCategory){
            return res.status(200).json({
                success:true,
                message:"Category already exist"
            })
        }
        const category =await new Category({name,slug:slugify(name)})
        category.save()
        res.status(201).json({
            success:true,
            message:"New category created",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Error in category"
        })
    }
}
//====update category

export const updateCategoryController =async(req,res) =>{
    try {
        const {name}=req.body;
        const {id} =req.params
        const category = await Category.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
            {new:true})
            res.status(200).json({
                success:true,
                message:"Category updated successfully",
                category
            })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Error while updating category"

        })
    }
}
//================= get all category

export const categoryController = async(req,res) =>{
  try {
    const category = await Category.find({})
    res.status(200).json({
        success:true,
        message:"All categories list",
        category
    })
  } catch (error) {
      console.log(error)
      res.status(500).json({
        success:false,
        error,
        message:"Error while getting all categories"
      })
  }
}
//single category controller
export const singleCategoryController = async(req,res) =>{
    try {
        const {slug} =req.params
        const category = await Category.findOne({slug})
        res.status(200).json({
            success:true,
            message:"get single category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Error in getting single category"
        })
    }

}

//delete category controller 
export const deletecategory = async(req,res) =>{
    try {
         const{id}=req.params
        await Category.findByIdAndDelete(id)
           res.status(200).json({
            success:true,
            message:"category deleted successully"
           })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            error,
            message:"Error while deleting category"
        })
    }
}