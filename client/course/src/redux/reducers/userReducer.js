import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  message: null,
  error: null,
  subscriptionId:null
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('loginRequest', (state, action) => {
      state.loading = true;
    })
    .addCase('loginSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('loginFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('registerRequest', (state, action) => {
      state.loading = true;
    })
    .addCase('registerSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase('registerFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('loadUserRequest', (state, action) => {
      state.loading = true;
    })
    .addCase('loadUserSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload
    })
    .addCase('loadUserFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('logoutRequest', (state, action) => {
      state.loading = true;
    })
    .addCase('logoutSuccess', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload
    })
    .addCase('logoutFail', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('clearError', (state) => {
      state.error = null;
    })
    .addCase('clearMessage', (state) => {
      state.message = null;
    });
});


export const profileReducer = createReducer(initialState,(builder)=>{
   builder.addCase('updateProfileRequest',(state,action)=>{
       state.loading = true
   })
   .addCase('updateProfileSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload
   })
   .addCase('updateProfileFail',(state,action)=>{
     state.loading = false
     state.error = action.payload
   })
  .addCase('updateProfilePictureRequest',(state,action)=>{
       state.loading = true
   })
   .addCase('updateProfilePictureSuccess',(state,action)=>{
     state.loading = false
     state.message = action.payload
   })
   .addCase('updateProfilePictureFail',(state,action)=>{
     state.loading = false
     state.error = action.payload
   })
   .addCase('changePasswordRequest',(state,action)=>{
    state.loading = true
})
.addCase('changePasswordSuccess',(state,action)=>{
  state.loading = false
  state.message = action.payload
})
.addCase('changePasswordFail',(state,action)=>{
  state.loading = false
  state.error = action.payload
})
   .addCase('forgetPasswordRequest',(state,action)=>{
    state.loading = true
})
.addCase('forgetPasswordSuccess',(state,action)=>{
  state.loading = false
  state.message = action.payload
})
.addCase('forgetPasswordFail',(state,action)=>{
  state.loading = false
  state.error = action.payload
})
   .addCase('resetPasswordRequest',(state,action)=>{
    state.loading = true
})
.addCase('resetPasswordSuccess',(state,action)=>{
  state.loading = false
  state.message = action.payload
})
.addCase('resetPasswordFail',(state,action)=>{
  state.loading = false
  state.error = action.payload
})
   .addCase('removeFromPlaylistRequest',(state,action)=>{
    state.loading = true
})
.addCase('removeFromPlaylistSuccess',(state,action)=>{
  state.loading = false
  state.message = action.payload
})
.addCase('removeFromPlaylistFail',(state,action)=>{
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

export const subscriptionReducer = createReducer(initialState,(builder)=>{
   builder.addCase('buySubscriptionRequest',(state,action)=>{
     state.loading = true
   })
   .addCase('buySubscriptionSuccess',(state,action)=>{
     state.loading = false;
     state.subscriptionId = action.payload
   })
   .addCase('buySubscriptionFail',(state,action)=>{
     state.loading = false;
     state.error = action.payload
   })
   builder.addCase('cancelSubscriptionRequest',(state,action)=>{
     state.loading = true
   })
   .addCase('cancelSubscriptionSuccess',(state,action)=>{
     state.loading = false;
     state.message = action.payload
   })
   .addCase('cancelSubscriptionFail',(state,action)=>{
     state.loading = false;
     state.error = action.payload
   })
   .addCase('clearError', (state) => {
    state.error = null;
  })
  .addCase('clearMessage', (state) => {
    state.message = null;
  })

})