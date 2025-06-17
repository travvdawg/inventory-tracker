import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import InspectionAnswers from './InspectionAnswers';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Client, Storage, ID } from 'appwrite';
import { useEffect, useState } from 'react';

const InspectionModal = ({ closeModal }) => {
	const harnessRef = useRef(null);
	const commentsRef = useRef(null);
	const answerRefs = useRef([]);
	const [inspectedThisMonth, setInspectedThisMonth] = useState([]);

	useEffect(() => {
		const client = new Client()
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

		const storage = new Storage(client);
		const BUCKET_ID = import.meta.env.VITE_APPWRITE_INSPECTION_BUCKET;

		const currentMonth = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

		const fetchMonthlyInspections = async () => {
			try {
				const result = await storage.listFiles(BUCKET_ID);
				const matches = result.files
					.map((file) => file.name)
					.filter((name) => name.startsWith(currentMonth))
					.map((name) => {
						const match = name.match(/Harness-([\w\d]+)/);
						return match?.[1];
					})
					.filter(Boolean);
				setInspectedThisMonth(matches);
			} catch (error) {
				console.error('Error checking inspections this month:', error);
			}
		};

		fetchMonthlyInspections();
	}, []);

	const BUCKET_ID = import.meta.env.VITE_APPWRITE_INSPECTION_BUCKET;

	const success = () => toast.success('Inspection Submitted!');

	const inspectionFields = [
		'Webbing condition',
		'Webbing at tie-in point',
		'Load-bearing stitching',
		'Gear loop',
		'Attachment buckles',
		'Double lanyard',
		'Pulley sling',
		'Carabiners',
		'Quick link',
		'Pulley',
	];

	const generatePDF = async () => {
		const client = new Client();
		client
			.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
			.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

		const storage = new Storage(client);

		const pdf = new jsPDF();
		const currentDate = new Date();
		const dateString = currentDate.toISOString().split('T')[0];

		const harnessNum = harnessRef.current?.value || 'N/A';
		const comments = commentsRef.current?.value || 'No additional comments';

		const answers = inspectionFields.map((field, i) => {
			const selectElement = answerRefs.current[i];
			return `${field}: ${selectElement?.value || 'N/A'}`;
		});

		pdf.setFontSize(16);
		pdf.text('Monthly Harness Inspection', 10, 10);
		pdf.setFontSize(12);
		pdf.text(`Date: ${dateString}`, 10, 20);
		pdf.text(`Harness Number: ${harnessNum}`, 10, 30);

		let yPosition = 40;
		answers.forEach((answer) => {
			pdf.text(answer, 10, yPosition);
			yPosition += 10;
		});

		pdf.text('Additional Comments:', 10, yPosition + 10);
		pdf.text(comments, 10, yPosition + 20, { maxWidth: 180 });

		const pdfBlob = pdf.output('blob');
		const fileName = `${dateString}-Harness-${harnessNum}.pdf`;

		try {
			const file = new File([pdfBlob], fileName, {
				type: 'application/pdf',
			});

			await storage.createFile(BUCKET_ID, ID.unique(), file);
			success();
		} catch (err) {
			console.error('Upload to Appwrite failed:', err);
			toast.error('Failed to upload PDF');
		}
	};

	return (
		<div className='modal'>
			<h2>Monthly Harness Inspection</h2>
			<select
				className='harness-number'
				ref={harnessRef}>
				<option value=''>--Harness Number--</option>
				{[...Array(200)].map((_, i) => {
					const harnessNum = String(i + 1);
					const alreadyInspected = inspectedThisMonth.includes(harnessNum);
					return (
						<option
							key={harnessNum}
							value={harnessNum}>
							{alreadyInspected ? `${harnessNum} ✅` : harnessNum}
						</option>
					);
				})}
				{[...Array(30)].map((_, i) => {
					const kidHarness = `K${i + 1}`;
					const alreadyInspected = inspectedThisMonth.includes(kidHarness);
					return (
						<option
							key={kidHarness}
							value={kidHarness}>
							{alreadyInspected ? `${kidHarness}` : `Kids ${i + 1} ✅`}
						</option>
					);
				})}
			</select>
			{inspectionFields.map((field, i) => (
				<InspectionAnswers
					key={i}
					label={field}
					ref={(el) => (answerRefs.current[i] = el)}
				/>
			))}
			<textarea
				placeholder='Additional comments'
				ref={commentsRef}></textarea>
			<div className='modal-buttons'>
				<button onClick={generatePDF}>Submit</button>
				<button onClick={closeModal}>Close</button>
			</div>
			<ToastContainer
				position='top-right'
				autoClose={10000}
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

export default InspectionModal;
