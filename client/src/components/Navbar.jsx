import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LoginIcon } from '../assets/login.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // logout
    const handleLogout = () => {
        // Call the backend logout endpoint
        fetch('http://localhost:8000/user/logout', {
            method: 'POST',
            credentials: 'include', // Include cookies in the request
        })
            .then(response => response.json())
            .then(data => {
                // Clear any local state related to authentication
                logout();
                // Navigate to the login page or any other desired page
                navigate('/login');
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    return (
        <nav className=" bg-[#272727] w-full overflow-hidden p-4">
            <div className="mx-0 flex justify-between items-center">
                <div className="text-white text-2xl font-semibold ml-4">
                    <Link to="/">Paisa Patrol</Link>
                </div>
                <div className="hidden md:flex space-x-7">
                    <Link to="/" className="text-white text-xl hover:text-red-700">HOME</Link>
                    {/* <Link to="/about" className="text-white text-xl hover:text-red-700">ABOUT</Link> */}
                    <Link to="/contact-us" className="text-white text-xl hover:text-red-700">CONTACT US</Link>
                    {isAuthenticated && (
                        <Link to="/dashboard/dashcontent" className="text-white text-xl hover:text-red-700">
                            DASHBOARD
                        </Link>
                    )}
                </div>
                <div className="text-white mr-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center justify-center">
                        {isAuthenticated ? (
                            <span onClick={handleLogout} className="flex items-center">
                                <LogoutIcon className="w-6 h-6 fill-current mr-1" />
                                Logout
                            </span>
                        ) : (
                            <Link to="/login" className="flex items-center">
                                <LoginIcon className="w-6 h-6 fill-current mr-1" />
                                Login
                            </Link>
                        )}
                    </button>
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={handleMobileMenu} className="text-white outline-none mobile-menu-button">
                        <svg
                            className={`w-6 h-6 ${!isMobileMenuOpen ? 'block' : 'hidden'}`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>

                        <svg
                            className={`w-6 h-6 ${isMobileMenuOpen ? 'block' : 'hidden'} text-red-500`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className={`mobile-menu ${isMobileMenuOpen ? 'block' : 'hidden'} transition-opacity ease-in duration-150 md:hidden`}>
                <ul>
                    <li className="active">
                        <Link to="/" className="block px-2 py-4 text-white text-xl hover:text-red-500">HOME</Link>
                    </li>
                    {/* <li>
                        <Link to="/about" className="block px-2 py-4 text-white text-xl hover:text-red-500">ABOUT</Link>
                    </li> */}
                    <li>
                        <Link to="/contact-us" className="block px-2 py-4 text-white text-xl hover:text-red-500">CONTACT US</Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link to="/dashboard/dashcontent" className="block px-2 py-4 text-white text-xl hover:text-red-500">DASHBOARD</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;