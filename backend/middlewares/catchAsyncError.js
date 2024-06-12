export const catchAsyncError = (passedfunction) =>async(req,res,next)=>{
   try {
      await passedfunction(req,res,next)
   } catch (error) {
     next(error)
     console.log(error)
   }
}