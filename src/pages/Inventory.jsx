import React, { useEffect, useState } from 'react';
import { databases, ID, account, Query } from '../lib/appwrite';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const HARDWARE_ID = import.meta.env.VITE_APPWRITE_HARDWARE_ID;
const USER_PROFILE_COLLECTION = import.meta.env
	.VITE_APPWRITE_USER_PROFILE_COLLECTION;

const Inventory = () => {
	const [hardwareList, setHardwareList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [newItemName, setNewItemName] = useState('');
	const [newItemAmount, setNewItemAmount] = useState('');

	const successNotification = () => {
		toast('New item added!');
	};

	useEffect(() => {
		async function fetchHardware() {
			try {
				const res = await databases.listDocuments(DATABASE_ID, HARDWARE_ID);
				setHardwareList(res.documents);
			} catch (err) {
				console.error('Error fetching inventory:', err);
			} finally {
				setLoading(false);
			}
		}

		fetchHardware();
	}, []);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const accountData = await account.get();
				setUser(accountData);

				const res = await databases.listDocuments(
					DATABASE_ID,
					USER_PROFILE_COLLECTION,
					[Query.equal('userId', accountData.$id)]
				);

				if (res.documents.length > 0) {
					setUserRole(res.documents[0].role);
				}
			} catch (err) {
				console.error('Failed to fetch user or role:', err);
			}
		}

		fetchUserData();
	}, []);

	const handleAddItem = async () => {
		if (!newItemName || !newItemAmount) return;

		try {
			const res = await databases.createDocument(
				DATABASE_ID,
				HARDWARE_ID,
				ID.unique(),
				{
					hardwareName: newItemName,
					amount: parseInt(newItemAmount),
				}
			);

			setHardwareList((prev) => [...prev, res]);
			successNotification();
			setNewItemName('');
			setNewItemAmount('');
		} catch (err) {
			console.error('Error adding item:', err);
		}
	};

	const handleUpdateAmount = async (id, currentAmount, change) => {
		const newAmount = Math.max(currentAmount + change, 0);

		try {
			await databases.updateDocument(DATABASE_ID, HARDWARE_ID, id, {
				amount: newAmount,
			});

			setHardwareList((prev) =>
				prev.map((item) =>
					item.$id === id ? { ...item, amount: newAmount } : item
				)
			);
		} catch (err) {
			console.error('Failed to update amount:', err);
		}
	};

	if (loading) return <p>Loading inventory...</p>;

	return (
		<div className='inventory-page'>
			<h2>Inventory</h2>
			<br />

			{user?.email === 'olivertravis554@gmail.com' && (
				<div className='add-inventory-item'>
					<h3>Add New Item</h3>
					<br />
					<div className='card-inputs'>
						<input
							type='text'
							placeholder='Item name'
							className='item-name'
							value={newItemName}
							onChange={(e) => setNewItemName(e.target.value)}
						/>
						<input
							type='number'
							placeholder='Initial amount'
							className='item-number'
							value={newItemAmount}
							onChange={(e) => setNewItemAmount(e.target.value)}
						/>
					</div>

					<button onClick={handleAddItem}>Add Item</button>
				</div>
			)}

			<div className='inventory-cards'>
				{hardwareList.map((item) => (
					<InventoryItem
						key={item.$id}
						item={item}
						onUpdate={handleUpdateAmount}
					/>
				))}
			</div>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='dark'
				transition={Bounce}
			/>
		</div>
	);
};

const InventoryItem = ({ item, onUpdate }) => {
	const [qty, setQty] = useState(1);

	return (
		<div className='inventory-item'>
			<h3>{item.hardwareName}</h3>
			<p>Current Amount: {item.amount}</p>

			<input
				type='number'
				min='1'
				value={qty}
				onChange={(e) => setQty(Number(e.target.value))}
			/>

			<button
				className='card-btns'
				onClick={() => onUpdate(item.$id, item.amount, qty)}>
				Add
			</button>

			<button
				className='card-btns'
				onClick={() => onUpdate(item.$id, item.amount, -qty)}>
				Subtract
			</button>
		</div>
	);
};

export default Inventory;
