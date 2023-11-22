
import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import authRouter from './Routes/authRouter.js'
import categoryRoutes from './Routes/categoryRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import cors from 'cors'


dotenv.config();

const app = express();
const port = process.env.PORT;
const URL = process.env.mongoUrl;


//middleware routes
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/users',authRouter)
app.use('/api/v1/category',categoryRoutes)
app.use("/api/v1/product",productRoutes)

//database connection
mongoose.connect(URL, {
  
}).then(() => {
  console.log("Database connected");
}).catch((err) => {
  console.log("Not connected", err);
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

