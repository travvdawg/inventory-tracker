import inspections from '../assets/inspections.png';
import supplies from '../assets/supplies.png';
import { Link } from 'react-router';

function LinkCard() {
	return (
		<div>
			<div className='card-container'>
				<Link to='/inspections'>
					<img
						src={inspections}
						alt='Inspections Image'
						className='cardImg'
					/>
				</Link>
				<Link to='/supplies'>
					<img
						src={supplies}
						alt='Supplies Image'
						className='cardImg'
					/>
				</Link>
			</div>
		</div>
	);
}
export default LinkCard;
