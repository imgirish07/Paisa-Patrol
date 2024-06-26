import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_BACKEND;

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otpsent, setOtpSent] = useState(0);
    const [otp, setOtp] = useState(0);
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1); // 1 for email input, 2 for OTP verification, 3 for new password
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSendOtp = async () => {
        const OTP = Math.floor((Math.random()) * 1000000);
        setOtpSent(OTP);
        try {
            const response = await axios.post(`${baseUrl}/sendotp`, { email, OTP });
            if (response.data.success) {
                setStep(2);
            }
        } catch (error) {
            console.log('Error sending OTP.');
        }
    }
    const handleOtpSubmit = async () => {
        if (otp == otpsent) {
            console.log('otp Verified');
            setStep(3);
        }
        else {
            console.log('Wrong OTP');
        }
    }
    const handlePasswordSubmit = async () => {
        try {
            const response = await axios.post(`${baseUrl}/updatepassword`, { email, password });
            if (response.data.success) {
                console.log('Password changed successfully')
                navigate('/login');
            }
        } catch (error) {
            console.log('Error resetting password.');
        }
    }
    // Implementation of Show Password
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='h-screen w-[100%] bg-[#1c1c1c] flex justify-center items-center'>
            <div className=' bg-[#272727] rounded-xl h-[70vh] w-[80vw] flex flex-col  sm:h-[70vh] sm:w-[40vw] lg:h-[70vh] lg:w-[25vw]'>
                <div className='text-white text-3xl font-bold h-[20%] flex items-center justify-center px-4'>
                    Forgot Password
                </div>
                <div className='text-white font-medium h-[40px] w-[100%] gap-x-1 flex items-center justify-center'>
                    New to this site?
                    <Link to="/signup" className='text-red-600 hover:text-orange-400'>Sign Up</Link>
                </div>
                <div className='flex flex-col gap-2 my-[20px] h-[45%] px-4'>
                    {step === 1 && (
                        <>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                className='bg-transparent border border-red-600 text-white h-[40px] px-[10px]'
                            />
                            <div className='flex justify-center mt-20 items-center h-[40px] bg-[#0664D3] hover:bg-[#4d8be5] text-white font-bold mx-4'>
                                <button onClick={handleSendOtp}>Send OTP</button>
                            </div>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <input
                                type="number"
                                name="otp"
                                placeholder="OTP"
                                onChange={handleOtpChange}
                                className='bg-transparent border border-red-600 text-white h-[40px] px-[10px]'
                            />
                            <div className='flex justify-center mt-20 items-center h-[40px] bg-[#0664D3] hover:bg-[#4d8be5] text-white font-bold mx-4'>
                                <button onClick={handleOtpSubmit}>Verify OTP</button>
                            </div>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="New Password"
                                    onChange={handlePasswordChange}
                                    className='bg-transparent border border-red-600 text-white h-[40px] px-[10px] w-full'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium'
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            <div className='flex justify-center mt-20 items-center h-[40px] bg-[#0664D3] hover:bg-[#4d8be5] text-white font-bold mx-4'>
                                <button onClick={handlePasswordSubmit}>Reset Password</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;