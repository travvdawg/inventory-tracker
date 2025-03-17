import React, { useState, useEffect } from 'react';
import { account, ID } from '../lib/appwrite';

const Register = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error) {
        console.log('No active session:', error);
      }
    }
    checkSession();
  }, []);

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
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
        <button
          type='button'
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
