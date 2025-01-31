import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AddProduct from './pages/AddProduct';
import Wishlist from './pages/Wishlist';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import AddEditAddress from './pages/AddEditAddress';
import Checkout from './pages/Checkout';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="pt-[72px]">
        <Navbar />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/productlist" element={<ProductsList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/addeditaddress" element={<AddEditAddress />} />
        <Route path="/addeditaddress/:addressId" element={<AddEditAddress />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard/users" element={<Users />} />
        <Route path="/admindashboard/orders" element={<Orders />} />
        <Route path="/admindashboard/products" element={<Products />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="/editproduct/:productId" element={<AddProduct />} />
        {/* <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminManagement />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
