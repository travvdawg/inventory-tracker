import './App.css';
import Navbar from './components/Navbar';
import LinkCard from './components/LinkCard';
import Harnesses from './pages/Harnesses';
import Hardware from './pages/Hardware';
import Wood from './pages/Wood';
import Courses from './pages/Courses';
import Inspections from './pages/InspectionSheets';
import Supplies from './pages/Supplies';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<LinkCard />}
				/>
				<Route
					path='/harnesses'
					element={<Harnesses />}
				/>
				<Route
					path='/wood'
					element={<Wood />}
				/>
				<Route
					path='/hardware'
					element={<Hardware />}
				/>
				<Route
					path='/courses'
					element={<Courses />}
				/>
				<Route
					path='/inspections'
					element={<Inspections />}
				/>
				<Route
					path='/supplies'
					element={<Supplies />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
