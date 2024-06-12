import express, { urlencoded } from "express"
import dotenv from "dotenv"
import courseRoute from './routes/courseRoute.js'
import ErrorMiddleware from "./middlewares/Error.js"
import userRoute from './routes/userRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import otherRoute from './routes/otherRoutes.js'
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config({
    path:'./config/config.env'
})
const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/v1',courseRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',paymentRoute)
app.use('/api/v1',otherRoute)



export default app

app.get('/',(req,res)=>{
  res.send(`<h1>Site is working.  click to <a href=${process.env.FRONTEND_URL}>here</a> visit frontend.</h1>`)
})

app.use(ErrorMiddleware)





