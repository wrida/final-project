import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ContactUs from './Pages/ContactUs';
import Navbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';
import Posts from './Pages/Posts';
import Users from './Pages/Users';



function App() {
  
  return (
    <>
    
   <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route  element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/contactUs' element={<ContactUs/>}/>
       </Routes>
  </>
  );
}

export default App;
