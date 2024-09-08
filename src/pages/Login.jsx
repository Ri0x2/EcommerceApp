import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in both fields!',
      });
      return;
    }

    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    // Debugging: Log the values to see what's being compared
    console.log('Stored User Data:', storedUserData);
    console.log('Input Email:', email);
    console.log('Input Password:', password);

    if (storedUserData) {
      // Check if the entered credentials match the stored data
      if (storedUserData.email === email && storedUserData.password === password) {
        // Handle successful login
        Swal.fire({
          icon: 'success',
          title: 'Logged In!',
          text: 'You have successfully logged in.',
        }).then(() => {
          // Set isSignedIn flag to true in localStorage
          localStorage.setItem('isSignedIn', 'true');
          // Redirect or perform other actions on successful login
          window.location.href = '/'; // Change this as needed
        });
      } else {
        // Handle invalid credentials
        Swal.fire({
          icon: 'error',
          title: 'Invalid credentials',
          text: 'Please check your email and password.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No account found',
        text: 'Please sign up before logging in.',
      });
    }
  };

  return (
    <>
      <div className='pt-[60px] pb-[140px] flex gap-[129px] lg:flex-nowrap flex-wrap'>
        <img src="/src/assets/Side Image.png" alt="" />
        <div className='pt-[125px] pr-0 lg:pr-9 mx-auto w-[90%]  lg:mx-0'>
          <h2 className='text-[36px] font-medium mb-6'>Log in to Exclusive</h2>
          <span>Enter your details below</span>
          <form className='flex flex-col gap-10 mt-10 mb-10' onSubmit={handleLogin}>
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
              className='bg-Button2 text-Text rounded py-3 px-10'
            >
              Log In
            </button>
            <span className='flex justify-center text-Button2'>
              Forget Password?
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
