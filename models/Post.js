import { Schema, model } from "mongoose";
const postScema=new Schema({
    userImage:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    postImage:{
        type:String,
        required:true
    },
    postComments:[
        {
            userImage:{
                type:String
            },
            userName:{
                type:String
            },
            comment:{
                type:String
            },
        }
    ]
},{timestamps:true})
export const Post=model('posts',postScema)
