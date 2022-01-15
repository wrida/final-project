import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllPosts } from './../slices/postSlice';
import { loadUser } from './../slices/userSlice';
import PostCard from './PostCard';


const Posts = () => {
    const dispatch = useDispatch();
    const {loading,postList,errors} = useSelector(state=>state.posts)
    useEffect(()=> {
    dispatch(getAllPosts())
    dispatch(loadUser())
    },[]) 
    console.log('postList', postList)
    return (
        <>
        <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'center',justifyItems:'center',width:'30%',
      position:'absolute'}}>
          {loading && <p>loading...</p>}

          {errors && <p>{errors.msg}</p>}

          {postList && postList.map(posts=><PostCard {...posts}/>)}
           

              
       
        </div>
        </>
    )
}

export default Posts
