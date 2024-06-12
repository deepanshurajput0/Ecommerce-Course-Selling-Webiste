import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   title:{
    type:String,
    required:[true,'Please enter course title'],
    minLength:[4,'title must be atleast 4 characters'],
    maxLength:[80,'Title can,t exceed 80 characters']
   },
   description:{
    type:String,
    required:[true,'Please enter description'],
    minLength:[20,'desc must be atleast 4 characters'],
   },
   lectures:[
    {   title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
        video:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
          },
    }
   ],
   poster:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
  },
   views:{
    type:Number,
    default:0
   },
   numOfVideos:{
    type:String,
    default:0
   },
   category:{
    type:String,
    required:true
   },
   createdBy:{
    type:String,
    required:[true,'Enter Course Creator Name']
   },
   createdAt:{
    type:Date,
    default:Date.now()
   }
})

export const Course = mongoose.model('Course',courseSchema)