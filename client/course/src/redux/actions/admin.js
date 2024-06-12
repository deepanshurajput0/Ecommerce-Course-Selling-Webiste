import { server } from "../store"
import axios from "axios"

export const createCourse=(formdata)=>async dispatch=>{
    try {
        dispatch({type:'createCourseRequest'})
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
              },
              withCredentials: true
        }
        const { data } = await axios.post(`${server}/createcourse`,formdata,config)
        dispatch({type:'createCourseSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'createCourseFail',payload:error.response.data}) 
    }
}
export const deleteCourse=(id)=>async dispatch=>{
    try {
        dispatch({type:'deleteCourseRequest'})
        const config = {
              withCredentials: true
        }
        const { data } = await axios.delete(`${server}/course/${id}`,config)
        dispatch({type:'deleteCourseSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'deleteCourseFail',payload:error.response.data}) 
    }
}
export const addLecture=(id,formdata)=>async dispatch=>{
    try {
        dispatch({type:'addLectureRequest'})
        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
              },
              withCredentials: true
        }
        const { data } = await axios.post(`${server}/course/${id}`,formdata,config)
        dispatch({type:'addLectureSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'addLectureFail',payload:error.response.data}) 
    }
}
export const deleteLecture=(courseId,lectureId)=>async dispatch=>{
    try {
        dispatch({type:'deleteLectureRequest'})
        const config = {
              withCredentials: true
        }
        const { data } = await axios.delete(`${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,config)
        dispatch({type:'deleteLectureSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'deleteLectureFail',payload:error.response.data}) 
    }
}



export const getAllUsers=()=>async dispatch=>{
    try {
        const config = {
            withCredentials: true
      }
        dispatch({type:'getAllUsersRequest'})
        const { data } = await axios.get(`${server}/admin/users`,config)
        dispatch({type:'getAllUsersSuccess',payload:data.users})
    } catch (error) {
        dispatch({type:'getAllUsersFail',payload:error.response.data}) 
    }
}

export const updateUserRole=(id)=>async dispatch=>{
    try {
        const config = {
            withCredentials: true
      }
        dispatch({type:'updateUserRoleRequest'})
        const { data } = await axios.put(`${server}/admin/user/${id}`,{},config)
        dispatch({type:'updateUserRoleSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'updateUserRoleFail',payload:error.response.data}) 
    }
}
export const deleteUser=(id)=>async dispatch=>{
    try {
        const config = {
            withCredentials: true
      }
        dispatch({type:'deleteUsersRequest'})
        const { data } = await axios.delete(`${server}/admin/user/${id}`,config)
        dispatch({type:'deleteUsersSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'deleteUsersFail',payload:error.response.data}) 
    }
}


export const getDashboardStats=()=>async dispatch=>{
    try {
        const config = {
            withCredentials: true
      }
        dispatch({type:'getAdminStatsRequest'})
        const { data } = await axios.get(`${server}/admin/stats`,config)
        dispatch({type:'getAdminStatsSuccess',payload:data})
    } catch (error) {
        dispatch({type:'getAdminStatsFail',payload:error.response.data}) 
    }
}