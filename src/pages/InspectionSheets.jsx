import { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function InspectionSheets() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalType, setModalType] = useState(null);
	const [checklist, setChecklist] = useState({});

	useEffect(() => {
		const savedChecklist = localStorage.getItem('checklist');
		if (savedChecklist) {
			setChecklist(JSON.parse(savedChecklist));
		}
	}, []);

	useEffect(() => {
		if (Object.keys(checklist).length > 0) {
			localStorage.setItem('checklist', JSON.stringify(checklist));
		}
	}, [checklist]);

	const handleCheckboxChange = (type, item) => {
		setChecklist((prev) => {
			const updatedChecklist = {
				...prev,
				[type]: {
					...prev[type],
					[item]: !prev[type]?.[item], // Toggle checkbox value
				},
			};
			localStorage.setItem('checklist', JSON.stringify(updatedChecklist)); // Save instantly
			return updatedChecklist;
		});
	};

	// Open modal with selected checklist type
	const openModal = (type) => {
		setModalType(type);
		setModalIsOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setModalIsOpen(false);
		setModalType(null);
	};

	const tasks = {
		dailyChecklist: [
			'Unlock the courses',
			'Inspect the courses',
			'Bring out harness racks',
			'Take gator out',
			'Leaf blow back deck / front entrance',
			'Check the restrooms',
			'Check trash cans (inside and outside)',
			'Pick up garbage around center/parking/park',
			'Side work',
		],
		harnessInspection: [
			'Check for wear & tear',
			'Ensure all buckles function',
			'Verify straps are intact',
		],
		courseInspection: [
			'Check all cables',
			'Inspect platforms',
			'Ensure obstacles are secure',
		],
		kitInspection: [
			'Verify all tools are accounted for',
			'Check for broken or missing parts',
		],
	};

	const getModalContent = () => {
		if (!modalType) return null; // Prevent errors if modalType is null

		return (
			<>
				<h2>{modalType.replace(/([A-Z])/g, ' $1').trim()}</h2>
				<form>
					{tasks[modalType]?.map((task, index) => (
						<div key={index}>
							<input
								type='checkbox'
								checked={checklist[modalType]?.[task] || false}
								onChange={() => handleCheckboxChange(modalType, task)}
							/>
							{task}
						</div>
					))}
				</form>
			</>
		);
	};

	return (
		<div>
			{/* Modal Component */}
			<Modal
				className='customModal'
				overlayClassName='customOverlay'
				isOpen={modalIsOpen}
				onRequestClose={closeModal}>
				{getModalContent()}
				<button onClick={closeModal}>Close</button>
			</Modal>

			{/* List of Items that Open the Modal */}
			<ul>
				<li>
					<button onClick={() => openModal('dailyChecklist')}>
						Daily Checklist
					</button>
				</li>
				<li>
					<button onClick={() => openModal('harnessInspection')}>
						Harness Inspection
					</button>
				</li>
				<li>
					<button onClick={() => openModal('courseInspection')}>
						Course Inspection
					</button>
				</li>
				<li>
					<button onClick={() => openModal('kitInspection')}>
						Kit Inspection
					</button>
				</li>
			</ul>
		</div>
	);
}

export default InspectionSheets;
