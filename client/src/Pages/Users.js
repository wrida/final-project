import { useEffect,useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllUsers} from './../slices/userSlice';
import UserCard from './UserCard';
const Users = () => {

  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const {loading,userList,users} = useSelector(state=>state.users)
  const [usersList, setUsersList] = useState(users);
 
  useEffect(()=> {
    dispatch(getAllUsers())
    },[]) 
    
    useEffect(() => {
      setUsersList(users)
    }, [users]);

    useEffect(() => {
      if(city !=""){
        const newUsers=usersList.filter((item)=>item.address.city.toLowerCase().includes(city.toLowerCase()))
        setUsersList(newUsers)
      }
      else{
        setUsersList(users)
      }
      
    }, [city]);
    
   
    return (
      <div className='users' style={{display:'flow',paddingLeft:'5%',position:'relative'}}>
      <h1 style ={{color:'white',fontSize:'50px',fontStyle:'oblique'}}>UserList</h1>
      <input value={city} onChange={(e)=>{setCity(e.target.value)}} type="text" placeholder="Region" 
    style={{outline:'none',padding:'10px',width:'35%',borderColor:'gray',borderWidth:'1px',borderRadius:'25px'
    ,height:'35px'}} />
      {loading ? <h2>Loading ...</h2> :usersList  && usersList.map((item)=>(<UserCard name={item.name} photo={item.photo} />))}
      </div>
    )

}

export default Users;