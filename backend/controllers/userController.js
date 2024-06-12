import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto"
import { Course } from "../models/Course.js";
import cloudinary from "cloudinary"
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";
export const register = catchAsyncError(async(req,res,next)=>{
  const { name, email, password } = req.body


  if(!name || !email || !password){
    return next(new ErrorHandler('All fields are required',400))
  }
  let user = await User.findOne({email})
  if(user) return next(new ErrorHandler('User Already Exists',409))
    const file = req.file 
  const fileUri = getDataUri(file)
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
    // upload file on cloudinary
   user = await User.create({
    name,
    email,
    password,
    avatar:{
        public_id:mycloud.public_id,
        url:mycloud.secure_url
    }
   })
   sendToken(res,user,'Registered Successfully',201)

})


export const Login = catchAsyncError(async(req,res,next)=>{
  const { email, password } = req.body

  if(!email || !password) return next(new ErrorHandler("All fields are required",400))

  const user = await User.findOne({email}).select('+password')

  if(!user) return next(new ErrorHandler("Incorrect email or password",409))
    
   const isMatch = await user.ComparePassword(password)

   if(!isMatch) return next(new ErrorHandler("Incorrect email or password",409))
   
   sendToken(res,user,`Welcome back, ${user.name}`,200)

})


export const Logout = catchAsyncError(async(req,res,next)=>{
   res.status(200).cookie('token',null,{
    expires: new Date(Date.now()),
    httpOnly:true,
    secure:true,
    sameSite:'none'
   }).json({
    success:true,
    message:'Logged out successfully'
   })
})


export const getMyProfile = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user._id)
  res.status(200).json({
    user
  })
})

export const ChangePassword = catchAsyncError(async(req,res,next)=>{
  const { oldPassword, newPassword } = req.body

  if(!oldPassword || !newPassword) return next(new ErrorHandler("All fields are required",400))
  
  const user = await User.findById(req.user._id).select('+password')

  const isMatched = await user.ComparePassword(oldPassword)

  if(!isMatched) return next(new ErrorHandler("Incorrect old password ",400))
    
    user.password = newPassword; 
    await user.save()

  res.status(200).json({
    success:true,
    message:"Password Changed Successfully"
  })
})

export const updateProfile = catchAsyncError(async(req,res,next)=>{
   
  const { name, email } = req.body

  const user = await User.findById(req.user._id)

  if(name) user.name = name;
  if(email) user.email = email;
  
  await user.save()

  res.status(200).json({
    success:true,
    message:"Profile Updated Successfully"
  })
})


export const updateProfilePicture = catchAsyncError(async(req,res,next)=>{
  const file = req.file 
  const user = await User.findById(req.user._id)
  const fileUri = getDataUri(file)
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id:mycloud.public_id,
    url:mycloud.secure_url
  }
  await user.save()
   res.status(200).json({
    success:true,
    message:'profile picture updated successfully'
   })
})
export const forgetPassword = catchAsyncError(async(req,res,next)=>{
   const { email } = req.body
   const user = await User.findOne({email})
   if(!user) return next(new ErrorHandler('User not found',400))
    const resetToken = await user.getResetToken()
    await user.save()
    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    const message = `Click on the link to reset your password ${url}.If you have not request then please ignore`
    await sendEmail(user.email,"course reset Password",message)
    
   res.status(200).json({
    success:true,
    message:`Reset Token has been sent to ${user.email}`
   })
})
export const resetPassword = catchAsyncError(async(req,res,next)=>{
  const { token } = req.params
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
  const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}})
  if(!user) return next(new ErrorHandler('Token is invalid or expired',401))
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save()
   res.status(200).json({
    success:true,
    message:'Password Changed Successfully',
    token
   })
})


export const getAllUsers = catchAsyncError(async(req,res,next)=>{
  const users = await User.find({})
  res.status(200).json({
    success:true,
    users
  })
})


export const updateUserRole = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user) return next(new ErrorHandler("User not found",404))
    user.role = user.role === 'user' ? 'admin' : 'user';
    await user.save()
  res.status(200).json({
    success:true,
    message:"Role updated"
  })
})

export const deleteUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id)
  if(!user) return next(new ErrorHandler("User not found",404))
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
  /// Cancel Subscription   
    await user.deleteOne()
  res.status(200).json({
    success:true,
    message:"User Deleted Successfully"
  })
})




export const deleteMyProfile = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user._id)
    await cloudinary.v2.uploader.destroy(user.avatar.public_id)
  /// Cancel Subscription   
    await user.deleteOne()
  res.status(200).cookie("token",null,{
    expires:new Date(Date.now())
  }).json({
    success:true,
    message:"User Deleted Successfully"
  })
})


User.watch().on('change',async()=>{
  const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(1)
  const subscriptions = await User.find({'subscription.status':"active"})
  stats[0].users= await User.countDocuments();
  stats[0].subscription= subscriptions.length;
  stats[0].createdAt = new Date(Date.now())
  await stats[0].save()
})







