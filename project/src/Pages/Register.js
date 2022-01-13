import React from 'react'
import {useEffect} from 'react'
import{useForm} from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register } from '../slices/userSlice'


const Register = () => {
    const { register,handleSubmit,formState:{errors}}=useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector(state=>state.users)
    useEffect(()=>{
      if(isAuth) navigate ('/profile')
    })
    const inputInfo = (data) => {
      console.log(data)
      dispatch(register(data)) 
    }
    return (
        <div className='register' style={{paddingLeft:"450px",paddingTop:"150px",fontFamily:'cursive',paddingRight:"680px"}}>
          <nav class="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
            <span style={{fontSize: "50px",}} className="h3">Register</span>
            </div>
        </nav>
        <form  onSubmit={handleSubmit(inputInfo)} className="register">
            <label htmlFor='name'>Name :</label>
            <input type="text" {...register('name',{required:true})} placeholder='name'/><br/>
            <label htmlFor='username'>Username :</label>
            <input type="text" {...register("username",{required:true})} placeholder='username'/><br/>
            <label htmlFor='email'>Email :</label>
            <input  type="email" {...register('email',{required: "email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }})} placeholder='email'/><br/>
          {errors.email &&<p style={{color:'red'}}> {errors.email.message}</p>}
            <label for='password'>Password :</label>
            <input type="password" {...register('password',{required:'password is required',minLength:{value:8,message:
            'password should be at least 8 characters'}})} placeholder='password'/>
            {errors.password && errors.password.message}
            <input  class="form-control" type="Submit" value="Sign Up"/>
        </form>
        </div>
    )
}

export default Register
