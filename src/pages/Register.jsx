import React, { useState, useEffect } from 'react';
import { account, ID } from '../lib/appwrite';
import { Navigate, useNavigate } from 'react-router-dom';

const Register = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

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

  if (loggedInUser) {
    return <Navigate to='/account' />;
  }

  async function registerUser() {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
      navigate('/account');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <div className='login'>
      <p>Please fill out all fields to register</p>

      <form className='login-form'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='button' onClick={registerUser}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
