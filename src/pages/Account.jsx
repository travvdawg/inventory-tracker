import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { account, Query } from '../lib/appwrite';
import DailyTaskList from '../components/DailyTaskList';
import { useTasks } from '../components/TaskContent';
import { databases } from '../lib/appwrite';
import { ToastContainer, toast } from 'react-toastify';
const Account = () => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [checking, setChecking] = useState(true);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { tasks, setTasks } = useTasks();
	const [newTask, setNewTask] = useState('');

	const notify = () => toast.error('You are not allowed to add a task');

	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const accountData = await account.get();
				setLoggedInUser(accountData);

				const res = await databases.listDocuments(
					import.meta.env.VITE_APPWRITE_DATABASE_ID,
					import.meta.env.VITE_APPWRITE_USER_PROFILE_COLLECTION,
					[Query.equal('userId', accountData.$id)]
				);

				if (res.documents.length > 0) {
					setUserRole(res.documents[0].role); // admin, editor, etc.
				}
			} catch (err) {
				console.error('Failed to fetch user or role:', err);
			} finally {
				setChecking(false);
			}
		}

		fetchUserData();
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
			notify();
		}
	};

	return (
		<div className='account'>
			<h2>Hello {loggedInUser.name}</h2>
			<button
				onClick={handleLogout}
				className='log-out-btn'>
				Logout
			</button>
			<br />
			{loggedInUser?.email === 'olivertravis554@gmail.com' && (
				<div className='add-tasks'>
					<input
						type='text'
						placeholder='New task'
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button
						onClick={handleAddTask}
						className='add-task-btn'>
						Add Task
					</button>
					<DailyTaskList
						user={loggedInUser}
						userRole={userRole}
					/>
				</div>
			)}

			<ToastContainer />
		</div>
	);
};

export default Account;
