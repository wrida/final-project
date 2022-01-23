
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Logout } from '../slices/userSlice'
import { Link } from 'react-router-dom';
import {FaBars,FaTimes} from 'react-icons/fa';

const Main = () => {
  const dispatch = useDispatch()
  const {isAuth,userInfo} = useSelector(state=>state.users)
  const [click,setClick] = useState(false)
  const handleClick = () => setClick(!click)
    return (
      <div>
      <nav>
        <ul className="nav-links">
          <div onClick ={handleClick}>
           {click ? <FaTimes /> : <FaBars />}
           </div>
        <Link to="/">Home</Link>
          {!isAuth ? <>
          <Link to="/register">Signup</Link>
          <Link to="/login">Signin</Link>
          <Link to="posts">Posts</Link>
          </> :
          <><p style = {{cursor:'pointer'}} button onClick={()=>dispatch(Logout())}>
            Logout</p><Link to="/profile">{userInfo.userName}</Link><Link to="posts">Posts</Link> </>}
          
          <Link to="contactUs"> ContactUs</Link>
          <div onClick={handleClick}/>
        
        </ul>
        </nav>
    </div>
    )
}

export default Main
