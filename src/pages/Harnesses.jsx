import { useState } from 'react';
import InspectionModal from '../components/InspectionModal';
import RepairModal from '../components/RepairModal';
import PartsModal from '../components/PartsModal';

function Harnesses() {
	const [activeModal, setActiveModal] = useState(null);

	const openModal = (modalType) => setActiveModal(modalType);
	const closeModal = () => setActiveModal(null);

	return (
		<div className={`harness-container ${activeModal ? 'modal-open' : ''}`}>
			<h2>Harness Management</h2>
			<div className='button-container'>
				<button onClick={() => openModal('inspection')}>Inspect Harness</button>
				<button onClick={() => openModal('repair')}>Report Repair</button>
				{/* <button onClick={() => openModal('parts')}>Manage Clic-it Parts</button> */}
			</div>

			{activeModal && (
				<div className='modal-overlay'>
					{activeModal === 'inspection' && (
						<InspectionModal closeModal={closeModal} />
					)}
					{activeModal === 'repair' && <RepairModal closeModal={closeModal} />}
					{activeModal === 'parts' && <PartsModal closeModal={closeModal} />}
				</div>
			)}
		</div>
	);
}

export default Harnesses;
