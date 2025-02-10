import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
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
    <AuthProvider>
      <Router>
        <div className="pt-[72px] flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productlist" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
              <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><ProductsList /></ProtectedRoute>} />
              <Route path="/products/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
              <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/addeditaddress" element={<ProtectedRoute><AddEditAddress /></ProtectedRoute>} />
              <Route path="/addeditaddress/:addressId" element={<ProtectedRoute><AddEditAddress /></ProtectedRoute>} />
              <Route path="/admindashboard/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/admindashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/admindashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route path="/admin/addproduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path="/editproduct/:productId" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
