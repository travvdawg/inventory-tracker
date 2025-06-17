import { useRef } from 'react';

const RepairModal = ({ closeModal }) => {
	const harnessRef = useRef(null);
	return (
		<div className='modal'>
			<h2>Report a Repair</h2>
			<select
				className='harness-number'
				ref={harnessRef}>
				<option value=''>--Harness Number--</option>
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
						Kids {i + 1}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Describe the issue'
			/>
			<button>Submit</button>
			<button onClick={closeModal}>Close</button>
		</div>
	);
};

export default RepairModal;
