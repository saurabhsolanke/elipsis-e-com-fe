import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            {token && (
                <div className="flex w-full flex-col justify-between bg-white px-6 py-5 shadow-lg dark:bg-zinc-900 dark:shadow-black/5 lg:flex-row lg:items-center">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div className="flex items-center text-lg font-bold text-gray-700 dark:text-zinc-500">
                            <span className="px-2 text-3xl"><a href="/productlist">Ellipses Clothing and Fashion</a> </span>
                        </div>
                        <button className="block lg:hidden" onClick={toggleMenu}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 dark:text-zinc-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className='text-white'>Hi {name}</p>
                    <div className={`${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
       overflow-hidden transition-all duration-300 ease-in-out lg:max-h-full lg:opacity-100 lg:block`}>
                        <ul className="flex flex-col gap-2 font-medium text-gray-700 dark:text-zinc-400 lg:flex-row lg:gap-4">
                            <li><a href="/productlist" className="text-sky-700">Home</a></li>
                            {role === 'admin' && (
                                <li><a href="/admindashboard" className="text-sky-700">Admin dashboard</a></li>
                            )}                            <li> <a href="/wishlist" className="hover:text-sky-700">  Wishlist </a> </li>
                            <li> <a href="" className="hover:text-sky-700"> Contact</a> </li>
                            <li> <a href="" className="hover:text-sky-700"> Orders</a> </li>
                            <li> <a href="/Cart" className="hover:text-sky-700"> Cart</a> </li>
                            <li> <a href="" onClick={handleLogout} className="hover:text-sky-700">Logout</a> </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;