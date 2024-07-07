import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import contactSvg from '../assets/contacts.svg';
import dashboardSvg from '../assets/dashboard.svg';
import historySvg from '../assets/history.svg';
import moneySvg from '../assets/money.svg';
import assistant from '../assets/assistant.svg';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND;

function Dashboard() {
    const [avatar, setAvatar] = useState(null);
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState(null);

    const handleNewImage = (e) => {
        setImage(e.target.files[0]);
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const fetchUser = async () => {
        // fetching user for showing username and image_url access from user;
        try {
            const res = await axios.get(`${baseUrl}/user/profile`, {
                withCredentials: true,
            });
            const user = res.data.user;
            setUserName(user.userName);
            setAvatar(user.image_url);  // Assuming `image_url` is the correct field
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const uploadImage = async () => {
        // uploading image to backend route
        let formdata = new FormData();
        formdata.append('image', image);
        try {
            const resp = await axios.post(`${baseUrl}/upload`, formdata, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            //console.log(resp);
            fetchUser();  // Refresh user data after uploading the image
            setImage(null);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };


    return (
        <div className="flex flex-col sm:flex-row h-[92.4vh] overflow-y-auto overflow-x-hidden bg-gradient-to-r from-gray-300 via-[#c595d1] to-[#d4c6d9]">

            {/* LEFT SECTION */}
            <div className="w-full border sm:border-gray-50 sm:rounded-none sm:w-[30%] lg:w-[30%] lg:mx-7 lg:my-7 p-4 bg-white bg-opacity-60 sm:bg-opacity-80 flex flex-col justify-center items-center shadow-md m-2 lg:rounded-2xl md:rounded-2xl transition duration-200">
                <div className="flex flex-col items-center mb-4">
                    <div className="mb-2">
                        <input name='image' type="file" onChange={handleNewImage} className="hidden" id="avatar" />
                        <label htmlFor="avatar" className="cursor-pointer">
                            <img
                                src={avatar ? avatar : 'https://cdn.pixabay.com/photo/2023/02/01/09/25/cristiano-ronaldo-7760045_960_720.png'}
                                alt="Avatar"
                                className="rounded-full w-24 h-24 border-4 border-white hover:border-purple-400 transition duration-200"
                                style={{ objectFit: 'cover' }}
                            />
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 md:text-xl sm:text-xl">{userName}</h2>
                    {image && (
                        <button
                            className="mt-2 px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-400 transition duration-200"
                            onClick={uploadImage}
                        >
                            Set Profile Picture
                        </button>
                    )}
                </div>
                <div className="flex-grow w-[100%]">
                    <ul className="flex flex-col items-center gap-2">
                        <li className="mb-2 flex items-center justify-center w-full">
                            <div className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl w-[90%]">
                                <Link to="dashcontent" className="flex items-center w-full">
                                    <img src={dashboardSvg} alt="Dashboard" className="w-8 h-8 fill-current mr-2" />
                                    <span>Dashboard</span>
                                </Link>
                            </div>
                        </li>
                        <li className="mb-2 flex items-center justify-center w-full">
                            <div className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl w-[90%]">
                                <Link to="addexpense" className="flex items-center w-full">
                                    <img src={moneySvg} alt="Money" className="w-8 h-8 fill-current mr-2" />
                                    <span>Add Expense</span>
                                </Link>
                            </div>
                        </li>
                        <li className="mb-2 flex items-center justify-center w-full">
                            <div className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl w-[90%]">
                                <Link to="contacts" className="flex items-center w-full">
                                    <img src={contactSvg} alt="Contacts" className="w-8 h-8 fill-current mr-2" />
                                    <span>Contacts</span>
                                </Link>
                            </div>
                        </li>
                        <li className="mb-2 flex items-center justify-center w-full">
                            <div className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl w-[90%]">
                                <Link to="history" className="flex items-center w-full">
                                    <img src={historySvg} alt="History" className="w-8 h-8 fill-current mr-2" />
                                    <span>History</span>
                                </Link>
                            </div>
                        </li>
                        <li className="mb-2 flex items-center justify-center w-full">
                            <div className="text-gray-700 hover:text-gray-400 font-bold flex items-center justify-start border border-gray-50 hover:border-gray-300 p-4 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200 text-xl w-[90%]">
                                <Link to="assistant" className="flex items-center w-full">
                                    <img src={assistant} alt="History" className="w-8 h-8 fill-current mr-2" />
                                    <span>AI Assistant</span>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="border sm:border-gray-50 sm:rounded-none w-full sm:w-2/3 lg:w-3/4 p-4 lg:mx-7 lg:my-7 shadow-md m-2 bg-white bg-opacity-60 sm:bg-opacity-80 flex flex-col items-center lg:rounded-2xl md:rounded-2xl transition duration-200">

                <Outlet />

            </div>
        </div>
    );
}

export default Dashboard