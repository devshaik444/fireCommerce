import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

function RegisterPage() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [cpassword,setcPassword]=useState('')
    const [loading, setLoading]=useState(false)
    const auth = getAuth();

//For Registering new User to firebase for site register purpose
    const register=async()=>{
        try{
            setLoading(true)
            const result=await createUserWithEmailAndPassword( auth,email, password)
            console.log(result);
            setLoading(false)
            toast.success("Registration Successful")

        }catch(error){
            console.log(error);
            toast.error("Registration Failed")
            setLoading(false)
        }
    }


    return (
        <div className='register-parent'>
        {loading && (<Loader/>)}   {/*if loading==true then display loader*/}
            <div className='register-top '>
            
            </div>

            <div className='row justify-content-center'>

                <div className='col-md-5 '>
                <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_wdgehveh.json"  
                background="transparent"  
                speed="1"   
                loop  
                autoplay>
                </lottie-player>
                </div>

                <div className='col-md-4 z1'>
                    <div className='register-form'>
                        
                        <h2>Register</h2>
                        
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                        <input type='text' className='form-control' placeholder='confirm password' value={cpassword} onChange={(e)=>{setcPassword(e.target.value)}}></input>

                        <button className='my-2' onClick={register}>REGISTER</button>
                        <hr/>
                        <Link to='/login'>
                            Click Here To Login
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default RegisterPage
