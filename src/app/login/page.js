'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace these with your chosen static admin credentials
    if (email === 'admin@gmail.com' && password === '123') {
      // Set a flag to indicate admin is authenticated
      localStorage.setItem('adminAuthenticated', 'true');
      router.push('/'); // Navigate to home page
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleLogin} className='min-h-screen flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>
          <span className='text-blue-500'>Admin</span> Login
        </p>
        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-none'
            type='email'
            placeholder='Enter Email'
            required
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1 outline-none'
            type='password'
            placeholder='Enter Password'
            required
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button
          type='submit'
          className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white w-full py-2 rounded-md text-base'
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginAdmin;
