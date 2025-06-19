import './App.css';
import Navbar from './components/Navbar';
import Harnesses from './pages/Harnesses';
import Hardware from './pages/Hardware';
import Wood from './pages/Wood';
import Courses from './pages/Courses';
import Inspections from './pages/InspectionSheets';
import Supplies from './pages/Supplies';
import Account from './pages/Account';
import Inventory from './pages/Inventory';
import { BrowserRouter, Route, Routes } from 'react-router';
import DailyTaskList from './components/DailyTaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import { TaskContent } from './components/TaskContent';

function App() {
	return (
		<TaskContent>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route
						path='/account'
						element={<Account />}
					/>

					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>

					<Route
						path='/'
						element={<DailyTaskList />}
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
					<Route
						path='/inventory'
						element={<Inventory />}
					/>
				</Routes>
			</BrowserRouter>
		</TaskContent>
	);
}

export default App;
