import { Link } from 'react-router';

function Navbar() {
	return (
		<div>
			<nav className='navbar'>
				<div className='nav-left'>
					<Link
						to='/'
						className='logo'>
						<img
							src='https://www.orlandotreetrek.com/wp-content/uploads/2019/11/orlando-tree-trek-logo.png'
							alt='OTTAP logo'
						/>
					</Link>
				</div>
				<div className='nav-right'>
					<ul className='nav-items'>
						<li>
							<Link to='/harnesses'>Harnesses</Link>
						</li>
						<li>
							<Link to='/wood'>Wood</Link>
						</li>
						<li>
							<Link to='/courses'>Courses</Link>
						</li>
						<li>
							<Link to='/hardware'>Hardware</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
export default Navbar;
