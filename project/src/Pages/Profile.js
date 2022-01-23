import React from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { loadUser } from './../slices/userSlice';
import {useEffect,useState} from 'react';
import {addPost,getAllPosts} from '../slices/postSlice';


function Profile() {
    const dispatch = useDispatch()
    const post = useSelector((state)=>state.posts);
    const {userInfo} = useSelector((state)=>state.users);
    useEffect(()=>{
    dispatch(loadUser());
    dispatch(getAllPosts());
    
    },[])
    const [postInfo, setpostInfo] = useState({});
    const [file, setfile] = useState({});
    const handleChange = (e) => {
      setpostInfo({...postInfo, [e.target.name]:e.target.value}); 
    };
    const handleSubmit = (e) => {
        e.preventDefault();
      console.log('POST : ',{ postInfo, file})
      dispatch(addPost({ postInfo, file}))  
    }
    return (
      <div style={{width:'100%',height:'500px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}> 

        <div style={{width:'50%',height:'200px',display:'flex',flexDirection:'column',justifyContent: 'center',alignItems: 'center',border: '1px solid'}} >
         <h2>Name :{userInfo.name} </h2>
         {<h2>Username :{userInfo.userName} </h2>}
         <h2>Email :{userInfo.email} </h2>
          <br/>
          <div>

          </div>
        </div>
        </div>
    )
}

export default Profile