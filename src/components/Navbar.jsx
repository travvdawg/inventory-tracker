function Navbar() {
	return (
		<div>
			<nav className='navbar'>
				<div className='nav-left'>
					<a
						href=''
						className='logo'>
						<img
							src='https://www.orlandotreetrek.com/wp-content/uploads/2019/11/orlando-tree-trek-logo.png'
							alt='OTTAP logo'
						/>
					</a>
				</div>
				<div className='nav-right'>
					<ul className='nav-items'>
						<li>
							<a href=''>Harnesses</a>
						</li>
						<li>
							<a href=''>Wood</a>
						</li>
						<li>
							<a href=''>Courses</a>
						</li>
						<li>
							<a href=''>Hardware</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}
export default Navbar;
