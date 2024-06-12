import express from "express"
import { addLectures, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures, removetoplaylist } from "../controllers/courseController.js";
import { authorizeAdmin, isAuthenticated, authorizeSubscribers } from "../middlewares/auth.js";
import { addToPlaylist } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router()

router.route('/course').get(getAllCourses)

router.route('/createcourse').post(isAuthenticated,authorizeAdmin,singleUpload,createCourse)

router.route('/addtoplaylist').post(isAuthenticated,addToPlaylist)

router.route('/removefromplaylist').delete(isAuthenticated,removetoplaylist)

router.route('/course/:id').get(isAuthenticated,authorizeSubscribers,getCourseLectures).post(isAuthenticated,authorizeAdmin,singleUpload,addLectures).delete(isAuthenticated,authorizeAdmin,deleteCourse)

router.route('/lecture').delete(isAuthenticated,authorizeAdmin,deleteLecture)

export default router;