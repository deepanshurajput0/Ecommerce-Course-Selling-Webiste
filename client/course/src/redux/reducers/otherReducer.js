import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    loading:false,
    message:null,
    error:null
}
export const otherReducer = createReducer(initialState,(builder)=>{
  builder
  .addCase('contactRequest',(state,action)=>{
    state.loading = true
  })
  .addCase('contactSuccess',(state,action)=>{
    state.loading = false
    state.message = action.payload
  })
  .addCase('contactFail',(state,action)=>{
    state.loading = false
    state.error = action.payload
  })
  .addCase('courseRequest',(state,action)=>{
    state.loading = true
  })
  .addCase('courseSuccess',(state,action)=>{
    state.loading = false
    state.message = action.payload
  })
  .addCase('courseFail',(state,action)=>{
    state.loading = false
    state.error = action.payload
  })
  .addCase('clearError', (state) => {
    state.error = null;
  })
  .addCase('clearMessage', (state) => {
    state.message = null;
  });
})