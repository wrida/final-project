import React from 'react'
import { useDispatch } from 'react-redux';
import { loadUser } from './../slices/userSlice';
import {useEffect,useState} from 'react';
import {addPost} from '../slices/postSlice';
function Profile() {
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(loadUser())
    
    },[])
    const [postInfo, setpostInfo] = useState({});
    const [file, setfile] = useState({});
    const handleChange = (e) => {
      setpostInfo({...postInfo, [e.target.name]:e.target.value}); 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postInfo)
      dispatch(addPost({postInfo,file}))  
    }
    return (
        <div>
          <form style ={{paddingTop:'100px',paddingLeft:'80px'}}>
              <input type="text" name="title" onChange = {handleChange} placeholder="Title"/>
              <input type="text" name="desc" onChange ={handleChange} placeholder="Description"/> 
              <input type="file" name="file" onChange = {(e)=>setfile(e.target.files[0])}/>
              <button type="submit" onClick={handleSubmit}> add post</button>
          </form>
        </div>
    )
}

export default Profile
