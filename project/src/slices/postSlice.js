import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// get a post list
export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',async(userInput,{rejectWithValue})=>{
       
       try {
         const {data} = await axios.get('/api/post/getposts')
        
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data.message
            ? errors.response.data.message
            : errors.response.data.errors.password.msg) 
       } 
    }
)
export const addPost = createAsyncThunk(
    'posts/addPost',async(info,{rejectWithValue})=>{
        const formData = new FormData();
        formData.append('picture', info.file);
        formData.append('info',JSON.stringify({...info.postInfo}));
        console.log(Array.from(formData));
       try {
         const {data} = await axios.post('/api/post/addPost',formData, {headers:{token:localStorage.getItem('token')}
        }) 
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)


const postSlice = createSlice({
    name: 'posts',
    initialState:{
        postList:[],
        loading: false,
        errors:null,
    },
    extraReducers:{
        [getAllPosts.pending]:(state)=>{
            state.loading = true;
        },
        [getAllPosts.fulfilled]:(state,action)=>{
            state.loading = false;
            state.postList = action.payload
            state.errors = null
            
        },
        [getAllPosts.rejected]:(state,action)=>{
        action.loading = false;
        state.errors = action.payload
        },
        //! new post handler
        [addPost.pending]:(state)=>{
            state.loading = true;
                    
            },
        [addPost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.postList = action.payload
            state.errors = null
                        
        },
        [addPost.rejected]:(state,action)=>{
        action.loading = false;
        state.errors = action.payload 
        },
    }
})

export default postSlice.reducer