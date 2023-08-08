import { Schema, model } from "mongoose";
const userScema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    hobby:{
        type:String
    },
    userImage:{
        type:String,
        default:'default.png'
    }
})
export const User=model('users',userScema)
