import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function (minimum 6 characters)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic validation checks
    if (!name) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name cannot be empty!',
      });
      return;
    }

    if (!email || !isValidEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a valid email address!',
      });
      return;
    }

    if (!password || !isValidPassword(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password should be at least 6 characters long!',
      });
      return;
    }

    // Simulate a successful sign-up
    const userData = { name, email, password };

    // Store user data and sign-in status in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isSignedIn', 'true');

    // Show SweetAlert success message
    Swal.fire({
      icon: 'success',
      title: 'Welcome!',
      text: `Hello ${name}, you have successfully signed up.`,
    }).then(() => {
      // Redirect to login or home page if needed
      window.location.href = '/Login.jsx'; // Change this if needed
    });
  };

  return (
    <>
      <div className='pt-[60px] pb-[140px] flex gap-[129px] lg:flex-nowrap flex-wrap'>
        <img src="/src/assets/Side Image.png" alt="" />
        <div className='pt-[125px] pr-0 lg:pr-9 mx-auto w-[90%]  lg:mx-0 '>
          <h2 className='text-[36px] font-medium mb-6'>Create an account</h2>
          <span>Enter your details below</span>
          <form className='flex flex-col gap-10 mt-10 mb-10' onSubmit={handleSignUp}>
            <input
              className='border-b-[1px] border-Primary1 py-2 outline-none'
              type="text"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='border-b-[1px] border-Primary1 py-2 outline-none'
              type="text"
              placeholder='Email or Phone Number'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='border-b-[1px] border-Primary1 py-2 outline-none'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className='bg-Button2 text-Text rounded py-4 flex justify-center'
            >
              Create Account
            </button>
            <button
              type="button"
              className='text-Text2 border-[1px] rounded py-4  justify-center flex gap-4'
            >
              <img src="/src/assets/Icon-Google.png" alt="" />
              Sign up with Google
            </button>
          </form>
          <span className='flex justify-center'>
            Already have an account? <Link className='ml-[14px] border-b-[1px]' to='/Login.jsx'>Login</Link>
          </span>
        </div>
      </div>
    </>
  );
}
