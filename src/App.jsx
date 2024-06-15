import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider } from './components/theme-provider';

function App() {
	return (
		<ThemeProvider
			defaultTheme='dark'
			storageKey='vite-ui-theme'
		>
			<div className='flex'>
				<Navbar />
				<div className='ml-64 p-8 flex-1'>
					<Outlet />
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
