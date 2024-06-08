import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { ThemeChanger } from '../ThemeChanger/ThemeChanger';

const Navbar = () => {
	return (
		<div className='fixed min-h-screen w-64 bg-gray-800 text-white flex flex-col justify-between left-0 top-0'>
			<div>
				<div className='flex items-center justify-center h-20 border-b border-gray-700'>
					<h1 className='text-2xl font-bold'>Admin Dashboard</h1>
				</div>
				<div className='mt-10'>
					<div className='flex items-center px-4 py-2'>
						<FaRegUserCircle className='h-10 w-10 text-gray-400' />
						<div className='ml-2'>
							<p className='text-sm font-medium'>John Doe</p>
							<p className='text-xs text-gray-400'>Administrator</p>
						</div>
					</div>
					<nav className='mt-10'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? 'block py-2.5 px-4 bg-gray-700 border-l-4 border-blue-500'
									: 'block py-2.5 px-4 hover:bg-gray-700'
							}
						>
							Dashboard
						</NavLink>
						<NavLink
							to='/tables'
							className={({ isActive }) =>
								isActive
									? 'block py-2.5 px-4 bg-gray-700 border-l-4 border-blue-500'
									: 'block py-2.5 px-4 hover:bg-gray-700'
							}
						>
							Tables
						</NavLink>
						<NavLink
							to='/charts'
							className={({ isActive }) =>
								isActive
									? 'block py-2.5 px-4 bg-gray-700 border-l-4 border-blue-500'
									: 'block py-2.5 px-4 hover:bg-gray-700'
							}
						>
							Charts
						</NavLink>
						<NavLink
							to='/calendar'
							className={({ isActive }) =>
								isActive
									? 'block py-2.5 px-4 bg-gray-700 border-l-4 border-blue-500'
									: 'block py-2.5 px-4 hover:bg-gray-700'
							}
						>
							Calendar
						</NavLink>
						<NavLink
							to='/kanban'
							className={({ isActive }) =>
								isActive
									? 'block py-2.5 px-4 bg-gray-700 border-l-4 border-blue-500'
									: 'block py-2.5 px-4 hover:bg-gray-700'
							}
						>
							Kanban Board
						</NavLink>
					</nav>
				</div>
			</div>
			<div className='flex items-center justify-start h-16 border-t border-gray-700'>
				<ThemeChanger />
			</div>
		</div>
	);
};

export default Navbar;
