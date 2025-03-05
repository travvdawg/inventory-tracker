import { useState } from 'react';

function Wood() {
	const [woodUsed, setWoodUsed] = useState('');
	const [totalUsed, setTotalUsed] = useState(0);
	const commonBoard = 50;

	const handleChange = (e) => {
		setWoodUsed(Number(e.target.value));
	};

	const handleSubmit = () => {
		if (woodUsed > 0 && woodUsed <= commonBoard - totalUsed) {
			setTotalUsed((prev) => prev + woodUsed);
		} else {
			alert('Invalid amount! Make sure it’s within the available stock.');
		}
	};

	return (
		<div className='wood'>
			<h2>Inventory</h2>
			<p>There are {commonBoard - totalUsed} pieces of wood left</p>
			<input
				type='number'
				placeholder='How many pieces of wood did you use?'
				className='woodCount'
				value={woodUsed}
				onChange={handleChange}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}

export default Wood;
