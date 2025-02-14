// import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LinkCard from './components/LinkCard';
import Harnesses from './pages/Harnesses';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
	return (
		<Router>
			<Navbar />
			<LinkCard />
			<Routes>
				<Route
					path='/harnesses'
					element={<Harnesses />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
