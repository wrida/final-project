import React from 'react'
import {useEffect} from 'react'
import{useForm} from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'



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
        <div className='register'>
            <div className="reg">
            <span>Register</span>
            </div>
            <div  className="log">
          <form  onSubmit={handleSubmit(inputInfo)}>
            <label htmlFor='name'>Name </label>
            <input type="text" {...register('name',{required:true})} placeholder='name'/><br/>
            <label htmlFor='username'>Username </label>
            <input type="text" {...register("username",{required:true})} placeholder='username'/><br/>
            <label htmlFor='email'>Email </label>
            <input  type="email" {...register('email',{required: "email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format"
          }})} placeholder='email'/><br/>
          {errors.email &&<p style={{color:'red'}}> {errors.email.message}</p>}
            <label for='password'>Password </label>
            <input type="password" {...register('password',{required:'password is required',minLength:{value:8,message:
            'password should be at least 8 characters'}})} placeholder='password'/>
            {errors.password && errors.password.message}
            <input type="Submit" value="Sign Up"/>
        </form>
        </div>
        </div>
    )
}

export default Register
