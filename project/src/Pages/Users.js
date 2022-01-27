import { useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllUsers} from './../slices/userSlice';
import { loadUser } from './../slices/userSlice';
import UserCard from './UserCard';

const Users = () => {

  const dispatch = useDispatch();
  const {loading,userList,errors} = useSelector(state=>state.users)
  useEffect(()=> {
    dispatch(getAllUsers())
    dispatch(loadUser())
    console.log('USERS', userList);
    },[]) 

    return (
      <>
      <h1>Liste des utilisateurs</h1>
      {userList  && userList.map((item)=>{return(<UserCard name={item.name} photo={item.photo} />)})}
      </>
    )

}

export default Users;