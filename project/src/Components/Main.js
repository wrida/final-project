import {Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Logout } from '../slices/userSlice'
import { Link } from 'react-router-dom';

const Main = () => {
  const dispatch = useDispatch()
  const {isAuth,userInfo} = useSelector(state=>state.users)
  const [click,setClick] = useState(false)
  const handleClick = () => setClick(!click)
    return (
      <div className="Navbar">
     
        <Container style={{display:'flex',position:'sticky',justifyContent: 'space-between'
        ,justifyItems:'flex-start'}}>
        <Link to="/">Home</Link>
          {!isAuth ? <>
          <Link to="/register">Signup</Link>
          <Link to="/login">Signin</Link>
         
          </> :
          <><p style = {{cursor:'pointer'}} button onClick={()=>dispatch(Logout())}>
            Logout</p><Link to="profile">Profile</Link>{userInfo.userName} <Link to="posts">Posts</Link></>}
          
          <Link to="contactUs"> ContactUs</Link>
          <div onClick={handleClick}/>
        
        </Container>
     
    </div>
    )
}

export default Main
