// import mongoose from "mongoose";

// const URL=process.env.mongoUrl;

// mongoose.connect(URL,{

// }).then(()=>{
// console.log("Database connected");
// }).catch((err)=>{
//     console.log("Not connected",err);
// });
// 

// const connectDb=async()=>{
//     try{
//         const mongoUrl=process.env.mongo_URL;

//         if(!mongoUrl){
//             console.log('Mongo URL not fount')
//             return;
//         }
//         const connection=await mongoose.connect(mongoUrl,{});
//         console.log(`database connected`)

//     }catch(error){
//         console.log('Not connected');
//     }
// }
//  export default connectDb;