import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import plantRouter from "./routes/plantRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app= express();


// middlewares

app.use(express.json());         // whenever a request comes from frontend to bk-end that will be parsed using json
app.use(cors())                  // accessing back end from front end


//db connection
connectDB();

// api endpoint
app.use('/api/plant',plantRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send('API is working')
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
})