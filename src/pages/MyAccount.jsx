import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function MyAccount() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    setFirstName(userData.name || '');
    setEmail(userData.email || '');
  }, []);

  const handleSaveChanges = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};

    // Check if the current password is correct
    if (storedUserData.password !== currentPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Current password is incorrect.',
      });
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New passwords do not match.',
      });
      return;
    }

    // Update user data in localStorage
    const updatedUserData = {
      ...storedUserData,
      name: firstName,
      email,
      password: newPassword,
    };

    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    // SweetAlert for successful save
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Changes saved successfully!',
      confirmButtonText: 'OK',
    }).then(() => {
      // Reload the page after clicking "OK"
      window.location.reload();
    });
  };

  return (
    <div className='max-w-screen-xl mx-auto pl-[90px] pr-[22px] mt-20 mb-[144px]'>
      <div className='flex justify-between'>
        <h3 className='mb-20'><span className='text-Text1'>Home</span> / My Account</h3>   
        <h3>Welcome! <span className='text-Secondary2'>{firstName}</span></h3> 
      </div>
      <div className='flex justify-between'>
        <div>
          <div>
            <h4 className='font-medium my-4'>Manage My Account</h4>
            <ul className='text-Text1 pl-9 flex flex-col gap-2'>
              <li className='text-Secondary2'>My Profile</li>
              <li>Address Book</li>
              <li>My Payment Options</li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium my-4'>My Orders</h4>
            <ul className='text-Text1 pl-9 flex flex-col gap-2'>
              <li>My Returns</li>
              <li>My Cancellations</li>
            </ul>
            <h4 className='font-medium mt-4'>My WishList</h4>
          </div>
        </div>
        <div className='py-10 px-20 shadow-md rounded w-[870px]'>
          <h4 className='text-Secondary2 text-xl font-medium mb-4'>Edit Your Profile</h4>
          <div className='flex gap-[50px]'>
            <div>
              <div className='flex flex-col mb-6'>
                <label className='mb-2'>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='w-[330px] bg-Text outline-none p-2 rounded'
                />
              </div>
              <div className='flex flex-col mb-6'>
                <label className='mb-2'>Last Name</label>
                <input
                  type="text"
                  placeholder='Rimel'
                  className='w-[330px] bg-Text outline-none p-2 rounded'
                />
              </div>
            </div>
            <div>
              <div className='flex flex-col mb-6'>
                <label className='mb-2'>Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-[330px] bg-Text outline-none p-2 rounded'
                />
              </div>
              <div className='flex flex-col mb-6'>
                <label className='mb-2'>Address</label>
                <input
                  type="text"
                  placeholder='Kingston, 5236, United State'
                  className='w-[330px] bg-Text outline-none p-2 rounded'
                />
              </div>
            </div>
          </div>
          <label>Password Changes</label>
          <div className='flex flex-col gap-4 mt-2'>
            <input
              type="password"
              placeholder='Current Password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='bg-Text outline-none p-2 rounded'
            />
            <input
              type="password"
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='bg-Text outline-none p-2 rounded'
            />
            <input
              type="password"
              placeholder='Confirm New Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='bg-Text outline-none p-2 rounded'
            />
          </div>
          <div className='flex justify-end gap-8 items-center'>
            <button className='mt-7'>Cancel</button>
            <button
              onClick={handleSaveChanges}
              className='bg-Secondary2 mt-8 text-Text block px-12 py-4 text-nowrap rounded outline-none'
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
