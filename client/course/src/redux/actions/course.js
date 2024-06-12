import { server } from "../store";
import axios from "axios";

export const getAllCourses=(category='',keyword='')=>async dispatch=>{
    try {
        dispatch({type:'allCoursesRequest'})
        const { data } = await axios.get(`${server}/course?keyword=${keyword}&category=${category}`)
        dispatch({type:'allCoursesSuccess',payload:data.courses})
    } catch (error) {
        dispatch({type:'allCoursesFail',payload:error.response.data}) 
    }
}
export const getCourseLectures=(id)=>async dispatch=>{
    try {
        dispatch({type:'getCourseRequest'})
        const { data } = await axios.get(`${server}/course/${id}`,{
            withCredentials:true
        })
        dispatch({type:'getCourseSuccess',payload:data.lectures})
    } catch (error) {
        dispatch({type:'getCourseFail',payload:error.response.data}) 
    }
}

export const addToPlaylist=(id)=>async dispatch=>{
    try {
        dispatch({type:'addToPlaylistRequest'})
        const { data } = await axios.post(`${server}/addtoplaylist`,{
            id
        },{
            headers:{
                'Content-Type':'application/json',
            },
            withCredentials:true
        })
        dispatch({type:'addToPlaylistSuccess',payload:data.message})
    } catch (error) {
        dispatch({type:'addToPlaylistFail',payload:error.response.data}) 
    }
}
