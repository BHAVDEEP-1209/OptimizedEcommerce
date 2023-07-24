import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser : {
    name : "",
    role : "",
    email : "",
    password : "",
    image : "",
    address : "",
    id : "",
  },
  business : {
    logo : "",
    name : "",
    desc : "",
  },
  isLoggedIn : false,
  adminId : "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue : (state,action)=>{
 
        state.currentUser.name = action.payload.name;
        state.currentUser.role = action.payload.role;
        state.isLoggedIn = true;
        state.currentUser.email = action.payload.email; 
        state.currentUser.image = action.payload.image; 
        state.currentUser.password = action.payload.password; 
        state.currentUser.id = action.payload._id; 
    },
    setAddress : (state,action)=>{
      state.currentUser.address = action.payload
    },
    setBusiness : (state,action)=>{
      state.business.logo = action.payload.logo;

      state.business.name = action.payload.brandName;
      state.business.desc = action.payload.brandDescription;

    },
    handleLogOut : (state)=>{
        state.currentUser = {};
        state.isLoggedIn = false;
        state.business={};
    },
    setAdminId : (state,action)=>{
      state.adminId = action.payload;
    },
  },
})

export const { setValue , handleLogOut , setAddress , setBusiness , setAdminId} = userSlice.actions

export default userSlice.reducer