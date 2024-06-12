import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken"
export const isAuthenticated = catchAsyncError(async(req,res,next)=>{

 const token = req.cookies.token;

 if(!token) return next(new ErrorHandler('Unauthorized user ',401))
 
  const dedcoded =  jwt.verify(token,process.env.JWT_SECRET)
  
  if(!dedcoded) return next(new ErrorHandler('Invalid Token ',401))

  req.user = await User.findById(dedcoded._id)
 
  next()
})


export const authorizeAdmin = (req,res,next) =>{
  if(req.user.role !== 'admin'){
    return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`,400))
  }
 next()  

}
export const authorizeSubscribers = (req,res,next) =>{
  if(req.user.subscription.status !== 'active' && req.user.role !== "admin"){
    return next(new ErrorHandler(`Only Subscribers can  access this resource`,400))
  }
 next()  

}


