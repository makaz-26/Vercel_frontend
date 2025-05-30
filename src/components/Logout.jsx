import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import axios from 'axios';

const Logout = ({ title }) => {
  const navigate = useNavigate();

  const isSubmit = ['submit', 'withdrawl'].includes(title?.toLowerCase());

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      // Optionally handle/log error
      // console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  return (
    <div className='mt-4 mb-4'>
      <button
        onClick={logoutHandler}
        className={`w-full max-w-sm mx-auto flex items-center justify-center space-x-2 
                   border border-teal-500 font-semibold py-2 px-6 rounded-full 
                   transition duration-200
                   ${isSubmit ? 'bg-teal-500 text-black' : 'text-teal-500 hover:bg-teal-500 hover:text-black'}`}
      >
        {!isSubmit && <FaPowerOff />}
        <span>{title}</span>
      </button>
    </div>
  );
};

export default Logout;