import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import GoogleLogo from '../assets/google.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Implementation of Show Password
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    // onChange function

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }
    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    // handleSubmit
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_USER_LOGIN}`, {
                email: email,
                password: password,
            }, {
                withCredentials: true
            });

            const data = res.data;
            console.log("data in frontend testing...", data);
            const boolValue = data.boolValue;
            if (boolValue) {
                login();  // Update the authentication state
                navigate("/dashboard/dashcontent")
            }
            console.log(data);

        } catch (error) {
            console.log("Error : ", error);
        }
    }

    // // Redirect to Google login page and then i can login and data will be stored in backend
    const handleGoogle = async (req, res) => {
        try {
            window.location.href = `${process.env.REACT_APP_GOOGLE_LOGIN_URI}`;
        } catch (error) {
            console.log("error : ", error);
        }
    }

    return (
        <div className='h-screen w-[100%] bg-[#1c1c1c]
        flex justify-center items-center'>

            <div className=' bg-[#272727] rounded-xl h-[70vh] w-[80vw] flex flex-col  sm:h-[70vh] sm:w-[40vw] lg:h-[70vh] lg:w-[25vw]'>

                <div className=' text-white text-4xl font-bold h-[10%] flex items-center justify-center px-4 ' >
                    Log In
                </div>

                <div className='text-white font-medium h-[40px] w-[100%] gap-x-1 flex items-center justify-center  ' >
                    New to this site?
                    <Link to="/signup" className='text-red-600 hover:text-orange-400'>Sign Up</Link>
                </div>

                <div className=' flex flex-col gap-2 my-[20px] h-[45%] px-4' >
                    {/* 
                    <input type="text" name="PhoneNumber" placeholder="Phone Number" className='border rounded-lg h-[40px] px-[10px] bg-[#f1f1f1]' /> */}

                    <input type="email" name="email" placeholder="Email" onChange={handleEmail} className='bg-transparent border border-red-600 text-white h-[40px] px-[10px] ' />

                    <input type={showPassword ? 'text' : 'password'}
                        name="Password"
                        placeholder="Password" onChange={handlePassword} className='bg-transparent border border-red-600 text-white h-[40px] px-[10px] ' />

                    <div className='flex justify-between'>
                        {/* showPassword */}
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className=' px-[12px] w-[40px] text-gray-400 font-medium '> {showPassword ? 'Hide' : 'Show'}
                        </button>

                        {/* ForgotPassword */}
                        <p type="button" className='px-[12px] w-[auto] text-gray-400 font-medium '>
                            <Link to='/forgotpassword'>Forgot Password</Link>
                        </p>
                    </div>

                </div>

                <div className='flex justify-center items-center h-[40px] bg-[#0664D3] hover:bg-[#4d8be5] text-white font-bold mx-4 ' >
                    <button type="submit" onClick={handleSubmit} >Sign In</button>
                </div>

                <div className='flex flex-col justify-center items-center gap-2'>

                    <div className=' font-medium h-[40px] w-[100%] flex items-center justify-center text-white ' >
                        Or
                    </div>

                </div>

                <div className='flex justify-center items-center border-2 border-gray-400 hover:border-orange-400 h-[40px] bg-transparent text-white font-bold mx-4'>
                    <button
                        type="submit"
                        onClick={handleGoogle}
                        className="flex items-center justify-center space-x-2 h-full w-full px-4"
                    >
                        <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5" />
                        <span>Google</span>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Login