import { useState, useEffect } from 'react';
import { databases, ID, Query } from '../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const HARNESS_COLLECTION = import.meta.env.VITE_APPWRITE_HARNESS_COLLECTION;

const ManageHarnessStatus = ({ closeModal }) => {
	const [harnesses, setHarnesses] = useState([]);

	useEffect(() => {
		const fetchHarnesses = async () => {
			try {
				const res = await databases.listDocuments(
					DATABASE_ID,
					HARNESS_COLLECTION,
					[Query.limit(200)]
				);
				// console.log('Harness documents:', res.documents);
				setHarnesses(res.documents);
			} catch (err) {
				console.error('Error fetching harnesses:', err);
			}
		};
		fetchHarnesses();
	}, []);

	// const harnessUpCount = harnesses.filter((h) => h.Status === 'Good').length;
	// const harnessDownCount = harnesses.filter((h) => h.Status !== 'Good').length;

	const updateStatus = async (id, newStatus) => {
		try {
			await databases.updateDocument(DATABASE_ID, HARNESS_COLLECTION, id, {
				Status: newStatus,
			});
			setHarnesses((prev) =>
				prev.map((h) => (h.$id === id ? { ...h, Status: newStatus } : h))
			);
		} catch (err) {
			console.error('Failed to update status:', err);
		}
	};

	return (
		<div className='modal'>
			<h3>Manage Harness Status</h3>
			<ul>
				{harnesses.map((h) => (
					<li key={h.$id}>
						<span>{h.HarnessNumber} - </span>
						<select
							value={h.Status}
							onChange={(e) => updateStatus(h.$id, e.target.value)}>
							<option value='Good'>Good</option>
							<option value='Down'>Down</option>
							<option value='Missing'>Missing</option>
						</select>
					</li>
				))}
			</ul>

			<button onClick={closeModal}>Close</button>
		</div>
	);
};

export default ManageHarnessStatus;
