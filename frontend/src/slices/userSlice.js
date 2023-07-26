import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SignIn, SignUp, updateUser } from '../utils/utils';
import { auth, provider } from "../firebase";
import { signInWithPopup } from 'firebase/auth';

// intial State
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
  isLoading : false,
  
}

// action to Sign In User
export const SignInUser = createAsyncThunk(
  'auth/SignInUser',
    async (formvalues, thunkAPI) => {
        const  response= await SignIn(formvalues)
        return response;
    }
  )


// action to Sign In With Google
export const SignInWithGoogle = createAsyncThunk(
  'auth/SignInWithGoogle',
    async (thunkAPI) => {
        const response = await signInWithPopup(auth,provider)
        let userData = {
          name: response.user.displayName,
          email: response.user.email,
          image: response.user.photoURL,
        };
        return userData;
    }
  )


// action to Regsiter a User
export const RegisterUser = createAsyncThunk(
  'auth/SignUpUser',
    async (formValues ,thunkAPI) => {
      const result = await SignUp(formValues);
      return result
    }
  )

// action to update User Info
export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
    async (obj ,thunkAPI) => {
      const result = await updateUser(obj.id,obj.data);
      return result
    }
  )


  // user Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue : (state,action)=>{ 
      const {business ,address , __v , _id , ...others }  = action.payload.data;
      state.currentUser = others;
      state.currentUser.id = action.payload.data._id;
      state.isLoggedIn = true;
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
  },

  /// method on the starting of action
  extraReducers: (builder) => {
    builder
    /// login in User ///////////////////
    .addCase(SignInUser.fulfilled, (state, action) => {
        if(action.payload.status==200){  
          const {business ,address , __v , _id , ...others }  = action.payload.data;
          state.currentUser = others;
          state.currentUser.id = action.payload.data._id;
          state.business = business;
          state.address = address.at(0);
          state.isLoggedIn = true;
        }
        state.isLoading = false;
    })
    .addCase(SignInUser.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(SignInUser.pending, (state, action) => {
        state.isLoading = true;
    })

    // register User /////////////////
    .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
    })
    .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
    })
    .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
    })

    //<!----------updatting User Info-----------------!>
    .addCase(updateUserInfo.fulfilled, (state, action) => {
      const {business ,address , __v , _id , ...others }  = action.payload.data;
      state.currentUser = others;
      state.currentUser.id = action.payload.data.id;
      state.business = business;
      state.address = address.at(0);
    })
    .addCase(updateUserInfo.rejected, (state, action) => {
        console.log("<!-----Error while updating user Info-----!>")
    })
    
  },
})

export const { setValue , handleLogOut , setAddress , setBusiness , setAdminId} = userSlice.actions

export default userSlice.reducer