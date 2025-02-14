import mongoose from "mongoose";

const plantSchema= new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

const plantModel= mongoose.models.plant || mongoose.model('plant',plantSchema);      //if the model is already present the first one will be used if not creates a new model
export default plantModel;