import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Components/Main.css'


const Home = () => {
    return (
<div className="home">
  
    <h1  style ={{color:'burlywood',paddingTop:'200px',fontStyle:'italic',fontFamily:'sans-serif',fontSize:'100px',display:'flex'
    ,justifyContent:'center',paddingRight:'70%', paddingLeft:'200px'}}> 
               Welcome</h1>
    <h2 style={{color:'burlywood',fontFamily:'sans-serif',fontSize:'50px',display:'flex',paddingLeft:'100px'}}> Discover our services </h2>           
</div>
    )
}

export default Home
