import { createReducer } from "@reduxjs/toolkit";

const initialState={
    users:[],
    stats:[],
    loading:false,
    error:null,
    message:null,
    usersCount:null,
    subscriptionCount:null,
    viewsCount:null,
    usersPercentage:null,
    viewsPercentage:null,
    subscriptionPercentage:null,
    usersProfit:null,
    viewsProfit:null,
    subscriptionProfit:null
  }

export const adminReducer = createReducer(initialState,(builder)=>{
   builder
  .addCase('getAdminStatsRequest',(state,action)=>{
    state.loading = true
   })
   .addCase('getAdminStatsSuccess',(state,action)=>{
    state.loading = false
    state.stats = action.payload.stats;
    state.viewsCount = action.payload.viewsCount;
    state.subscriptionCount = action.payload.subscriptionCount;
    state.usersCount = action.payload.usersCount;
    state.subscriptionPercentage = action.payload.subscriptionPercentage;
    state.viewsPercentage = action.payload.viewsPercentage;
    state.usersPercentage = action.payload.usersPercentage;
    state.viewsProfit = action.payload.viewsProfit;
    state.subscriptionProfit = action.payload.subscriptionProfit;
    state.usersProfit = action.payload.usersProfit;
   })
   .addCase('getAdminStatsFail',(state,action)=>{
    state.loading = true
    state.error = action.payload;
   })
  .addCase('getAllUsersRequest',(state,action)=>{
    state.loading = true
   })
   .addCase('getAllUsersSuccess',(state,action)=>{
    state.loading = false
    state.users = action.payload;
   })
   .addCase('getAllUsersFail',(state,action)=>{
    state.loading = true
    state.error = action.payload;
   })
  .addCase('deleteUsersRequest',(state,action)=>{
    state.loading = true
   })
   .addCase('deleteUsersSuccess',(state,action)=>{
    state.loading = false
    state.message = action.payload;
   })
   .addCase('deleteUsersFail',(state,action)=>{
    state.loading = true
    state.error = action.payload;
   })
  .addCase('updateUserRoleRequest',(state,action)=>{
    state.loading = true
   })
   .addCase('updateUserRoleSuccess',(state,action)=>{
    state.loading = false
    state.message = action.payload;
   })
   .addCase('updateUserRoleFail',(state,action)=>{
    state.loading = true
    state.error = action.payload;
   })
    .addCase('createCourseRequest',(state,action)=>{
     state.loading = true
    })
    .addCase('createCourseSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload;
    })
    .addCase('createCourseFail',(state,action)=>{
     state.loading = true
     state.error = action.payload;
    })
    .addCase('deleteCourseRequest',(state,action)=>{
     state.loading = true
    })
    .addCase('deleteCourseSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload;
    })
    .addCase('deleteCourseFail',(state,action)=>{
     state.loading = true
     state.error = action.payload;
    })
    .addCase('addLectureRequest',(state,action)=>{
     state.loading = true
    })
    .addCase('addLectureSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload;
    })
    .addCase('addLectureFail',(state,action)=>{
     state.loading = true
     state.error = action.payload;
    })
    .addCase('deleteLectureRequest',(state,action)=>{
     state.loading = true
    })
    .addCase('deleteLectureSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload;
    })
    .addCase('deleteLectureFail',(state,action)=>{
     state.loading = true
     state.error = action.payload;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
})


