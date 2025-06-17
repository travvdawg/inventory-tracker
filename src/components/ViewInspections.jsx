import { useState, useEffect } from 'react';
import { Client, Storage } from 'appwrite';

const ViewInspections = ({ closeModal }) => {
	const [files, setFiles] = useState([]);
	const [filteredFiles, setFilteredFiles] = useState([]);
	const [selectedHarness, setSelectedHarness] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');

	const client = new Client()
		.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
		.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
	const storage = new Storage(client);
	const BUCKET_ID = import.meta.env.VITE_APPWRITE_INSPECTION_BUCKET;

	useEffect(() => {
		const getFiles = async () => {
			const result = await storage.listFiles(BUCKET_ID);
			setFiles(result.files);
		};
		getFiles();
	}, []);

	useEffect(() => {
		const filtered = files.filter((file) => {
			const matchHarness = selectedHarness
				? file.name.includes(`Harness-${selectedHarness}`)
				: true;
			const matchMonth = selectedMonth
				? file.name.startsWith(selectedMonth) // ex: "2025-06"
				: true;
			return matchHarness && matchMonth;
		});
		setFilteredFiles(filtered);
	}, [files, selectedHarness, selectedMonth]);

	return (
		<div className='modal'>
			<h3>View Harness Inspections</h3>
			<select onChange={(e) => setSelectedHarness(e.target.value)}>
				<option value=''>--Select Harness--</option>
				{[...Array(200)].map((_, i) => (
					<option
						key={i + 1}
						value={i + 1}>
						{i + 1}
					</option>
				))}
				{[...Array(30)].map((_, i) => (
					<option
						key={`K${i + 1}`}
						value={`K${i + 1}`}>
						K{i + 1}
					</option>
				))}
			</select>
			<input
				type='month'
				onChange={(e) => setSelectedMonth(e.target.value)}
			/>
			<ul>
				{filteredFiles.map((file) => (
					<li key={file.$id}>
						<a
							href={storage.getFileView(BUCKET_ID, file.$id).href}
							target='_blank'
							rel='noopener noreferrer'>
							{file.name}
						</a>
					</li>
				))}
			</ul>
			<button onClick={closeModal}>Close</button>
		</div>
	);
};
export default ViewInspections;
