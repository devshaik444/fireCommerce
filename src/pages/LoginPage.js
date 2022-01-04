import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';



function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading]=useState(false)
    const auth = getAuth();

    //User Login to site if credential(email,pass) matches
    const login=async()=>{
        try{
            setLoading(true)
            const result=await signInWithEmailAndPassword( auth,email, password)
            localStorage.setItem('currentUser', JSON.stringify(result))/*store currentUser*/
            setLoading(false)
            toast.success("Login Successful")
            window.location.href='/' /*navigating user to HomePage if login successful*/

        }catch(error){
            console.log(error);
            toast.error("Login Failed")
            setLoading(false)
        }
    }



    return (
        <div className='login-parent'>
        {loading && (<Loader/>)}
            <div className='login-top'>

            </div>
            <div className='row justify-content-center'>
                <div className='col-md-4 z1'>
                    <div className='login-form'>

                        <h2>Login</h2>

                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>

                        <button className='my-2'onClick={login}>LOGIN</button>
                        <hr />

                        <Link to='/register'>
                            Click Here To Register
                        </Link>
                    </div>
                </div>

                <div className='col-md-5 '>
                    <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_skfh9odt.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay>
                    </lottie-player>

                </div>

            </div>

        </div>
    )
}

export default LoginPage

