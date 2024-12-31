import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('/productlist');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('userid');
        navigate('/login');
    };

    return (
        <div>
            {token && (
                <div className="flex w-full flex-col justify-between bg-white px-6 py-5 shadow-lg dark:bg-zinc-400 dark:shadow-black/5 lg:flex-row lg:items-center">
                    <div className="flex items-center justify-between w-full lg:w-auto">
                        <div className="flex items-center text-lg font-bold text-gray-700 dark:text-zinc-500">
                            <span className="px-2 text-3xl"><a href="/productlist">Ellipses</a> </span>
                        </div>
                        <button className="block lg:hidden" onClick={toggleMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 dark:text-zinc-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2" >
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <div className={`${isMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
       overflow-hidden transition-all duration-300 ease-in-out lg:max-h-full lg:opacity-100 lg:block`}>
                        <ul className="flex flex-col gap-2 font-medium text-gray-700 dark:text-zinc-400 lg:flex-row lg:gap-4">
                            <li>
                                <span className="mr-4 rounded-md py-0.5 px-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-100 hover:bg-emerald-200">
                                    {name}
                                </span>
                            </li>
                            {/* <li> <a href="/productlist" className={`hover:text-sky-700 ${activeLink === '/productlist' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/productlist'); navigate('/productlist'); }}>Home</a></li> */}
                            {role === 'admin' && (
                                <li><a href="/admindashboard" className={`hover:text-sky-700 ${activeLink === '/admindashboard' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/admindashboard'); navigate('/admindashboard'); }}>Dash</a></li>
                            )}
                            <li> <a href="/wishlist" className={`hover:text-sky-700 ${activeLink === '/wishlist' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/wishlist'); navigate('/wishlist'); }}>
                                <img src='/assets/heart.svg' /> </a> </li>
                            {/* <li> <a href="/contact" className={`hover:text-sky-700 ${activeLink === '/contact' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/contact'); navigate('/contact'); }}>Contact</a> </li> */}
                            {/* <li> <a href="/orders" className={`hover:text-sky-700 ${activeLink === '/orders' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/orders'); navigate('/orders'); }}>Orders</a> </li> */}
                            <li> <a href="/Cart" className={`hover:text-sky-700 ${activeLink === '/Cart' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/Cart'); navigate('/Cart'); }}>
                                <img src='/assets/cart.svg' /> </a> </li>
                            <li> <a href="/profile" className={`hover:text-sky-700 ${activeLink === '/profile' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/profile'); navigate('/profile'); }}>
                                <img src='/assets/person-circle.svg' /></a> </li>
                            <li> <a href="" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="hover:text-sky-700">
                            <img src='/assets/box-arrow-right.svg' /> 
                                </a> </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;