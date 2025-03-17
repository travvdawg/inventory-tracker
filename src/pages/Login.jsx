import React, { useState, useEffect } from 'react';
import { account, ID } from '../lib/appwrite';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  if (checking) return <p>Loading...</p>;

  if (loggedInUser) {
    return <Navigate to='/account' />;
  }

  return (
    <div className='login'>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
      </p>

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

        <button type='button' onClick={() => login(email, password)}>
          Login
        </button>
        <button type='button' onClick={() => navigate('/register')}>
          Don't have an account?
        </button>
      </form>
    </div>
  );
};

export default Login;
