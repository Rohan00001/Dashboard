import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<div className='flex'>
			<Navbar />
			<div className='ml-64 p-8 flex-1'>
				<Outlet />
			</div>
		</div>
	);
}

export default App;
