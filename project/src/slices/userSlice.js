import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// register a new user
export const register = createAsyncThunk(
    'user/register',async(userInput,{rejectWithValue})=>{
       try {
         const {data} = await axios.get('/api/user/register',userInput) 
         return data
       } catch (errors) {
        return  rejectWithValue(errors) 
       } 
    }
)
// login as a user
export const login = createAsyncThunk(
    'user/login',async(userInput,{rejectWithValue})=>{
       try {
           console.log(userInput)
         const {data} = await axios.post('/api/user/login',userInput) 
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)
// load user info
export const loadUser = createAsyncThunk(
    'user/loadUser',async(info,{rejectWithValue})=>{
        try {
            const {data} = await axios.get('/api/user/loaduser'
            ,{headers:{token:localStorage.getItem('token')}})
            return data  
        } catch (errors) {
          return  rejectWithValue(errors.response.data)   
        }
    }
)
// upload profile image
export const uploadPicture = createAsyncThunk(
    'user/uploadPicture',async(info,{rejectWithValue})=> {
        const formData = new FormData();
        formData.append('photo', info.file);
        formData.append('info',JSON.stringify({...info.postInfo}));
        try {
            const{data} = await axios.put('api/user/uploadPhoto',formData, {headers:{token:localStorage.getItem('token')}
        })
            return data;
        } catch (errors) {
        return  rejectWithValue(errors.response.data)  
        }
    }
)


// get a User list
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',async(userInput,{rejectWithValue})=>{
       
       try {
         const {data} = await axios.post('/api/user/getusers', userInput)
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data.message
            ? errors.response.data.message
            : errors.response.data.errors.password.msg) 
       } 
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState:{
        userList: [],
        userInfo:{},
        isAuth:Boolean(localStorage.getItem('isAuth')) || false,
        errors:null,
        token:localStorage.getItem('token') || null,
    },
    reducers:{
        Logout:(state)=>{
            localStorage.removeItem('token')
            localStorage.removeItem('isAuth')
            state.isAuth = false
            state.token = null
            state.userInput = {}
        }
    },
    extraReducers:{
    //! register handlers
     [register.pending]:(state)=>{
     state.loading = true
     },

     [getAllUsers.pending]:(state)=>{
        state.loading = true;
    },
    [getAllUsers.fulfilled]:(state,action)=>{
        state.loading = false;
        state.userList = action.payload
        state.errors = null
        
    },
     [register.fulfilled]:(state,action)=>{
        state.loading = false
        state.token = action.payload.token
        localStorage.setItem('token',action.payload.token)
        localStorage.setItem('isAuth',true)
        state.isAuth = true
        state.errors = null
        },
        [register.rejected]:(state,action)=>{
        state.loading = false
        state.errors = action.payload
        },
    //!login handler
       [login.pending]:(state)=>{
        state.loading = true
        },
        [login.fulfilled]:(state,action)=>{
           state.loading = false
           state.token = action.payload.token
           localStorage.setItem('token',action.payload.token)
           localStorage.setItem('isAuth',true)
           state.isAuth = true
           state.errors = null
           },
        [login.rejected]:(state,action)=>{
           state.loading = false
           state.errors = action.payload
         },
    //! load user info handler
        [loadUser.pending]:(state)=>{
        state.loading = true
        },
        [loadUser.fulfilled]:(state,action)=>{
           state.loading = false
           state.userInfo = action.payload
           state.isAuth = true
           state.errors = null
           },
        [loadUser.rejected]:(state,action)=>{
           state.loading = false
           state.errors = action.payload
         },
    //! upload user profile picture
    [uploadPicture.pending]:(state)=>{
        state.loading = true  
    },
    [uploadPicture.fulfilled]:(state,action)=>{
        state.loading = false
        state.userInfo = action.payload
        state.isAuth = true
        state.errors = null
    },
    [uploadPicture.rejected]:(state,action)=>{
        state.loading = false
        state.errors = action.payload
        state.isAuth = true
        state.errors = null
    },
    }
})

export default userSlice.reducer
export const {Logout} = userSlice.actions

