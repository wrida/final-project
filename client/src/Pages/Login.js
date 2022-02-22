import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../slices/userSlice'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth,} = useSelector(state=>state.users)
    useEffect(()=>{
      if(isAuth) navigate ('/profile')
    })
    const {errors} = useSelector(state=>state.users)
    const {register,handleSubmit} = useForm()
    const loginInput = (data) => {
        console.log(data)
        dispatch(login(data))
    }
    return (
        <div>
            <form className="login" onSubmit={handleSubmit(loginInput)}>
                <label for='email'>email </label>
             <input id='email'{...register('email')} type="email" placeholder="Email" required/>
             <label for="password">password </label>
            <input id='password'{...register('password')} type="password" placeholder="Password"  required/>
            {errors && <p>{errors.msg}</p>}
            <input id='submit'  type="submit" value = 'Login'/>
            </form>
        </div>
    )
}

export default Login
