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
        <div className=''>
            {token && (
                <div className="fixed top-0 z-40 flex w-full flex-col justify-between bg-white px-6 py-5 shadow-lg dark:bg-zinc-400 dark:shadow-black/5 lg:flex-row lg:items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center text-lg font-bold text-gray-700 dark:text-zinc-500">
                            <span className="px-2 text-3xl"><a href="/productlist">Ellipses</a> </span>
                        </div>
                        <span className="hidden md:inline-block rounded-md py-0.5 px-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-100 hover:bg-emerald-200">
                            {name}
                        </span>
                        <div className="flex items-right gap-3 text-lg font-bold text-gray-700 dark:text-zinc-500">
                            {role === 'admin' && (
                                <a href="/admindashboard" className={`hover:text-sky-700 ${activeLink === '/admindashboard' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/admindashboard'); navigate('/admindashboard'); }}>Dash</a>
                            )}
                            <a href="/wishlist" className={`hover:text-sky-700 ${activeLink === '/wishlist' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/wishlist'); navigate('/wishlist'); }}>
                                <img src='/assets/heart.svg' /> </a>
                            {/* <li> <a href="/contact" className={`hover:text-sky-700 ${activeLink === '/contact' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/contact'); navigate('/contact'); }}>Contact</a> </li> */}
                            {/* <li> <a href="/orders" className={`hover:text-sky-700 ${activeLink === '/orders' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/orders'); navigate('/orders'); }}>Orders</a> </li> */}
                            <a href="/Cart" className={`hover:text-sky-700 ${activeLink === '/Cart' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/Cart'); navigate('/Cart'); }}>
                                <img src='/assets/cart.svg' /> </a>
                            <a href="/profile" className={`hover:text-sky-700 ${activeLink === '/profile' ? 'text-blue-500' : ''}`} onClick={(e) => { e.preventDefault(); setActiveLink('/profile'); navigate('/profile'); }}>
                                <img src='/assets/person-circle.svg' /></a>
                            <a href="" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="hover:text-sky-700">
                                <img src='/assets/box-arrow-right.svg' />
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Navbar;