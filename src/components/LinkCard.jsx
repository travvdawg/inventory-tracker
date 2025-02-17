import hardwareImg from '../assets/Hardware.png';
import coursesImg from '../assets/Courses.jpg';
import harnessesImg from '../assets/Harnesses.png';
import woodImg from '../assets/Wood.jpg';
import { Link } from 'react-router';

function LinkCard() {
	return (
		<div>
			<div className='card-container'>
				<Link to='/hardware'>
					<img
						src={hardwareImg}
						alt='Hardware'
						className='cardImg'
					/>
				</Link>

				<Link to='/courses'>
					<img
						src={coursesImg}
						alt='Courses'
						className='cardImg'
					/>
				</Link>

				<Link to='/harnesses'>
					<img
						src={harnessesImg}
						alt='Harnesses'
						className='cardImg'
					/>
				</Link>

				<Link to='/wood'>
					<img
						src={woodImg}
						alt='Wood'
						className='cardImg'
					/>
				</Link>
			</div>
		</div>
	);
}
export default LinkCard;
