import { createReducer } from "@reduxjs/toolkit";


const initialState={
  courses:[],
  lectures:[],
  loading:false,
  error:null,
  message:null
}

export const courseReducer = createReducer(initialState,(builder)=>{
  builder.addCase('allCoursesRequest',(state,action)=>{
    state.loading = true
  })
  .addCase('allCoursesSuccess',(state,action)=>{
   state.loading = false;
   state.courses = action.payload 
  })
  .addCase('allCoursesFail',(state,action)=>{
    state.loading = false;
    state.error = action.payload
  })
  builder.addCase('getCourseRequest',(state,action)=>{
    state.loading = true
  })
  .addCase('getCourseSuccess',(state,action)=>{
   state.loading = false;
   state.lectures = action.payload 
  })
  .addCase('getCourseFail',(state,action)=>{
    state.loading = false;
    state.error = action.payload
  })
  .addCase('addToPlaylistRequest',(state,action)=>{
    state.loading = true
  })
  .addCase('addToPlaylistSuccess',(state,action)=>{
   state.loading = false;
   state.courses = action.payload
  })
  .addCase('addToPlaylistFail',(state,action)=>{
    state.loading = false;
    state.error = action.payload
  })
  .addCase('clearError', (state) => {
    state.error = null;
  })
  .addCase('clearMessage', (state) => {
    state.message = null;
  });
})