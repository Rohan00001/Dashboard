import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Dashboard from './Pages/Dashboard.jsx';
import Tables from './Pages/Tables.jsx';
import Charts from './Pages/Charts.jsx';
import Error from './Pages/Error.jsx';
import CalenderPage from './Pages/CalenderPage.jsx';
import KanbanPage from './Pages/KanbanPage.jsx';

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route
			path='/'
			element={<App />}
		>
			<Route
				path='/'
				element={<Dashboard />}
			/>
			<Route
				path='/tables'
				element={<Tables />}
			/>
			<Route
				path='/charts'
				element={<Charts />}
			/>
			<Route
				path='/calendar'
				element={<CalenderPage />}
			/>

			<Route
				path='*'
				element={<Error />}
			/>
			<Route
				path='/kanban'
				element={<KanbanPage />}
			/>
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
