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

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<ProductsList />} /> */}
        <Route path="/productlist" element={<ProductsList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admindashboard/users" element={<Users />} />
        <Route path="/admindashboard/orders" element={<Orders />} />
        <Route path="/admindashboard/products" element={<Products />} />
        <Route path="/admin/addproduct" element={<AddProduct/>} />
        <Route path="/editproduct/:productId" element={<AddProduct/>} />
        {/* <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin" element={<AdminManagement />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
