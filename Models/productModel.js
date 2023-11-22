import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        trim:true
      },
      description:{
        type:String,
        required:true,
        trim:true
      },
      price:{
        type:Number,
        required:true
      },
      category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
      photo:{
        data:Buffer,
        contentType:String
      },
      shipping:{
        type:Boolean
      }
},{timestamps:true})

const Products =mongoose.model("Products",productSchema)
export default Products;