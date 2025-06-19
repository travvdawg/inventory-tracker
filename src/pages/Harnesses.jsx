import { useState, useEffect } from 'react';
import InspectionModal from '../components/InspectionModal';
import RepairModal from '../components/RepairModal';
import PartsModal from '../components/PartsModal';
import ViewInspections from '../components/ViewInspections';
import ManageHarnessStatus from '../components/ManageHarnessStatus';
import { Query } from 'appwrite';
import { databases } from '../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const HARNESS_COLLECTION = import.meta.env.VITE_APPWRITE_HARNESS_COLLECTION;

function Harnesses() {
	const [activeModal, setActiveModal] = useState(null);
	const [harnesses, setHarnesses] = useState([]);

	console.log(
		harnesses.map((h) => ({
			id: h.$id,
			number: h.HarnessNumber,
			status: h.Status,
		}))
	);

	useEffect(() => {
		const fetchHarnesses = async () => {
			try {
				const res = await databases.listDocuments(
					DATABASE_ID,
					HARNESS_COLLECTION,
					[Query.limit(200)]
				);
				setHarnesses(res.documents);
			} catch (err) {
				console.error('Error fetching harnesses:', err);
			}
		};
		fetchHarnesses();
	}, []);

	const inRotation = harnesses.filter((h) => h.Status === 'Good').length;
	const outOfRotation = harnesses.length - inRotation;

	const openModal = (modalType) => setActiveModal(modalType);
	const closeModal = () => setActiveModal(null);

	return (
		<div className={`harness-container ${activeModal ? 'modal-open' : ''}`}>
			<div className='harness-rotation-card'>
				<div className='harness-rotation-card'>
					<h2>Harnesses up - {inRotation}</h2>
					<h2>Harnesses down - {outOfRotation}</h2>
				</div>
			</div>
			<div className='button-container'>
				<button onClick={() => openModal('inspection')}>Inspect Harness</button>
				<button onClick={() => openModal('repair')}>Report Repair</button>
				<button onClick={() => openModal('view')}>View Inspections</button>
				<button onClick={() => openModal('manage')}>
					View Harnesses in Rotation
				</button>
			</div>

			{activeModal && (
				<div className='modal-overlay'>
					{activeModal === 'inspection' && (
						<InspectionModal closeModal={closeModal} />
					)}
					{activeModal === 'repair' && <RepairModal closeModal={closeModal} />}
					{activeModal === 'parts' && <PartsModal closeModal={closeModal} />}
					{activeModal === 'view' && (
						<ViewInspections closeModal={closeModal} />
					)}
					{activeModal === 'manage' && (
						<ManageHarnessStatus closeModal={closeModal} />
					)}
				</div>
			)}
		</div>
	);
}

export default Harnesses;
