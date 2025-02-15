import React, { useState } from 'react';
import { loginUser } from '../api';
import { useAuth } from "../components/auth/AuthContext"; // Import useAuth
import { useNavigate, useLocation } from 'react-router-dom'; // Change this import


const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth(); // Get login function from AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);
      console.log('Login successful:', data);
      localStorage.setItem('currentUser', JSON.stringify(data));
      localStorage.setItem('token', data.tokens.access.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('userid', data.user.id);
      login(data.tokens.access.token);
      if (data.user.role == 'admin') {
        navigate('/admindashboard');
      }
      else {
        navigate('/productlist');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='h-full'>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-white">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            {/* <img className="w-8 h-8 mr-2" src="" alt="logo" /> */}
            Ellipses Clothing and Fashion
          </a>
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                Sign in to your account
              </h1>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Your email</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} required type="email" name="email" id="email" className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-black">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required name="password" id="password" placeholder="••••••••" className="bg-gray-100 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm text-blue-500 underline">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg transition duration-300 ease-in-out">Sign in</button>
                <p className="text-sm font-light text-gray-500">Don’t have an account yet?
                  <a href="/register" className="font-medium text-blue-500 underline">Sign up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div className='col-span-4'>
          <label className='block text-sm/6 font-medium text-gray-900'>Username</label>
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <input className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /></div>
        </div>
        <div className='col-span-4'>
          <label className='block text-sm/6 font-medium text-gray-900'>Password</label>
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
            <input className='block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /></div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-5 py-2 px-4 rounded" type="submit">Login</button>
      </form> */}
    </div>
  );
};

export default Login;
