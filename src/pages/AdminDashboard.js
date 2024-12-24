import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, updateProduct, deleteProduct, fetchProductById } from '../api';

const AdminDashboard = () => {
    
    return (
        <div className="flex justify-between m-16">
            <div className="card1 users align-middle flex items-center justify-center h-32">
                <Link to="/admindashboard/users"><span className='text-center'>Users</span></Link>
            </div>
            <div className="card1 products align-middle flex items-center justify-center h-32">
                <Link to="/admindashboard/products"><h1 className='text-center'>Products</h1></Link>
            </div>
            <div className="card1 orders align-middle flex items-center justify-center h-32">
                <Link to="/admindashboard/orders"><h1 className='text-center'>Orders</h1></Link>
            </div>
        </div>
    );
};

export default AdminDashboard;