import hardwareImg from '../assets/Hardware.png';
import coursesImg from '../assets/Courses.jpg';
import harnessesImg from '../assets/Harnesses.png';
import woodImg from '../assets/Wood.jpg';

function LinkCard() {
	return (
		<div>
			<div className='card-container'>
				<a href=''>
					<img
						src={hardwareImg}
						alt='Hardware'
						className='cardImg'
					/>
				</a>
				<a href=''>
					<img
						src={coursesImg}
						alt='Hardware'
						className='cardImg'
					/>
				</a>
				<a href=''>
					<img
						src={harnessesImg}
						alt='Hardware'
						className='cardImg'
					/>
				</a>
				<a href=''>
					<img
						src={woodImg}
						alt='Hardware'
						className='cardImg'
					/>
				</a>
			</div>
		</div>
	);
}
export default LinkCard;
