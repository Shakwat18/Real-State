import mongoose from "mongoose"


const ResidencyModel= new mongoose.Schema({
    title:{
        type:String,
        required: true['Title is required'],
        minlength:[6, "minimum title Lenght must be 6 characters"]

    },
    description:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    image:{
        type:String
    },
    owerId:{
        type:String,
        ref:'User'
    }
},{timestamps:true})

const Residency= mongoose.model("residencies",ResidencyModel)

export default Residency