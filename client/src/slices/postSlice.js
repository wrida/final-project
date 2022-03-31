import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const FormData = require('form-data')
// get a post list
export const getAllPosts = createAsyncThunk(
    'posts/getAllPosts',async(userInput,{rejectWithValue})=>{
       
       try {
         const {data} = await axios.get('/api/post/')
        
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data.message
            ? errors.response.data.message
            : errors.response.data.errors.password.msg) 
       } 
    }
)
// add a new post
export const addPost = createAsyncThunk(
    'posts/addPost',async(info,{rejectWithValue,dispatch})=>{
        const formData = new FormData();
        formData.append('picture', info.file);
        formData.append('title',info.postInfo.title);
        formData.append('desc',info.postInfo.desc);
        try {
         const {data} = await axios.post('http://localhost:5000/api/post/addPost',formData, {headers:{token:localStorage.getItem('token')}
        })
         return data
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)
// delete a post by id
export const deletePost = createAsyncThunk(
    'posts/deletePost',async(postId,{rejectWithValue,dispatch})=>{
       try {
         const {data} = await axios.delete(`/api/post/${postId}`,{headers:{token:localStorage.getItem('token')}
        })
        
         return dispatch(getAllPosts())
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)
// update post by id
export const updatePost = createAsyncThunk(
    'posts/updatePost',async(postInfo,{rejectWithValue,dispatch})=>{
       const formData = new FormData();
       formData.append('picture', postInfo.file);
       formData.append('title',postInfo.title);
       formData.append('desc',postInfo.desc);
       try {
        const {data} = await axios.put(`/api/post/${postInfo.id}`,formData,{headers:{token:localStorage.getItem('token')}
    })
        const updateData={title:postInfo.title,desc:postInfo.desc,picture:postInfo.file,id:postInfo.id}
        data.title=postInfo.title;
        data.desc=postInfo.desc;
        data.image=postInfo.file;
        return dispatch(getAllPosts())
      } catch (errors) {
       return  rejectWithValue(errors.response.data) 
      } 
    }
)
// like/dislike a post
export const likePost = createAsyncThunk(
    'posts/likePost',async(postId,{rejectWithValue,dispatch})=>{
       try {
         await axios.put(`/api/post/like/${postId}`,null, {headers:{token:localStorage.getItem('token')}
        })
         return dispatch(getAllPosts())
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)
// add a comment to a post
export const commentPost = createAsyncThunk(
    'posts/commentPost',async(post,{rejectWithValue,dispatch})=>{
       try {
         await axios.put(`/api/post/comment/${post.id}`,{'comment':post.comment}, {headers:{token:localStorage.getItem('token')}
        })
         return dispatch(getAllPosts())
       } catch (errors) {
        return  rejectWithValue(errors.response.data) 
       } 
    }
)
// delete a comment 
export const deleteComment = createAsyncThunk(
    'posts/deleteComment' ,async(info,{rejectWithValue,dispatch})=> {
        try {
            await axios.delete(
                `api/comment/${info}/${commentInfo.postId}`,
                { desc:commentInfo.desc },
                {
                    headers: { token: localStorage.getItem('token')}
                }
            );
            return dispatch(getAllPosts())
        } catch (error) {
            return rejectWithValue(errors.response.data)
        }
    }
);
const postSlice = createSlice({
    name: 'posts',
    initialState:{
        postList:[],
        loading: false,
        errors:null,
    },
    extraReducers:{
        //! post list handler
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
            state.postList = [...state.postList,action.payload]
            state.errors = null
                        
        },
        [addPost.rejected]:(state,action)=>{
        action.loading = false;
        state.errors = action.payload 
        },
         //! update post handler
         [updatePost.pending]:(state)=>{
            state.loading = true;
                    
            },
        [updatePost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.errors = null
                        
        },
        [updatePost.rejected]:(state,action)=>{
        action.loading = false;
        state.errors = action.payload 
        },
          //! like/dislike post handler
          [likePost.pending]:(state)=>{
            state.loading = true;
                    
            },
        [likePost.fulfilled]:(state,action)=>{
            state.loading = false;
            state.errors = null
                        
        },
        [likePost.rejected]:(state,action)=>{
        action.loading = false;
        state.errors = action.payload 
        },
    }
})

export default postSlice.reducer