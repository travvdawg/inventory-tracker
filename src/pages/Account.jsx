import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { account } from '../lib/appwrite';
import DailyTaskList from '../components/DailyTaskList';
import { useTasks } from '../components/TaskContent';
import { databases } from '../lib/appwrite';

const Account = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { tasks, setTasks } = useTasks();
  const [newTask, setNewTask] = useState('');

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

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;

    try {
      const user = await account.get();
      const response = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        'unique()',
        {
          text: newTask,
          userId: user.$id,
        }
      );

      setTasks([...tasks, { id: response.$id, text: newTask }]);
      setNewTask('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className='account'>
      <h2>Hello {loggedInUser.name}</h2>
      <p>Email: {loggedInUser.email}</p>
      <button onClick={handleLogout} className='log-out-btn'>
        Logout
      </button>
      <br />
      <div className='add-tasks'>
        <input
          type='text'
          placeholder='New task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} className='add-task-btn'>
          Add Task
        </button>
      </div>

      <DailyTaskList />
    </div>
  );
};

export default Account;
