import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user'
      });
      console.log('Registration successful:', data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className=''>
      <section className="bg-gray-50 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            Ellipses Clothing and Fashion
          </a>
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Create an account
              </h1>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Your name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="name@company.com" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-black">Confirm password</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required 
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg transition duration-300 ease-in-out"
                >
                  Create account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <a href="/login" className="font-medium text-blue-500 underline">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;