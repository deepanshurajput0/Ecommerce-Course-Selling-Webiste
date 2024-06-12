import express from "express"
import { ChangePassword, Login, Logout, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, register, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from "../controllers/userController.js"
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js"
const router = express.Router()

router.route('/register').post(singleUpload,register)

router.route('/login').post(Login)

router.route('/logout').get(Logout)

router.route('/me').get(isAuthenticated,getMyProfile)

router.route('/me').delete(isAuthenticated,deleteMyProfile)

router.route('/changepassword').put(isAuthenticated,ChangePassword)

router.route('/updateprofile').put(isAuthenticated,updateProfile)

router.route('/updateprofilepicture').put(singleUpload,isAuthenticated,updateProfilePicture)

router.route('/forgetpassword').post(forgetPassword)

router.route('/resetPassword/:token').put(resetPassword)

// admin routes

router.route('/admin/users').get(isAuthenticated,authorizeAdmin,getAllUsers)


router.route('/admin/user/:id').put(isAuthenticated,authorizeAdmin,updateUserRole).delete(isAuthenticated,authorizeAdmin,deleteUser)

export default router