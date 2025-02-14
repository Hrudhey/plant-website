import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect(process.env.MongoDB_url).then(()=>console.log('Db connected'));
}
