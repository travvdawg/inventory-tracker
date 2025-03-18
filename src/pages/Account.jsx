import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // slight fix: should be from 'react-router-dom'
import { account } from '../lib/appwrite';
import DailyTaskList from '../components/DailyTaskList';

const Account = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error) {
        console.log('No active session:', error);
      } finally {
        setChecking(false);
      }
    }
    checkSession();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession('current');
    setIsLoggingOut(true);
  };
  if (checking) return <p>Loading...</p>;
  if (isLoggingOut) {
    return <Navigate to='/login' />;
  }

  if (!loggedInUser) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='account'>
      <h2>Hello {loggedInUser.name}</h2>
      <p>Email: {loggedInUser.email}</p>
      <br />
      <DailyTaskList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
