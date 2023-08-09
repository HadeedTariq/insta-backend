import express from 'express'
import dotenv from 'dotenv'
import {connectDb} from './connection/db.js'
import { userRouter } from './routes/userRouter.js'
import { postRouter } from './routes/postRouter.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
connectDb().then(()=>console.log('data base connected'))
const app=express()
app.set('trust proxy',1)
app.use(express.static(path.resolve('./public')))
app.use(cookieParser())
app.use(cors({credentials:true,origin:'https://insta-frontend-six.vercel.app'}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    return res.send("Hello")
})
app.use('/user',userRouter)
app.use('/post',postRouter)
if(process.env.API_PORT){
    app.listen(3000,()=>console.log('app is listening on port 3000'))
}
export default app;