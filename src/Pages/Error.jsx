import React from 'react';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

const Error = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800'>
			<h1 className='text-9xl font-extrabold tracking-widest text-gray-900'>
				404
			</h1>
			<div className='px-2 rounded text-2xl '>Page Not Found</div>
			<div className='mt-5 flex flex-col items-center justify-center'>
				<h1 className='text-2xl md:text-3xl lg:text-4xl font-light leading-normal'>
					Sorry, we couldn't find the page you're looking for.
				</h1>
				<Link
					to='/'
					className='flex justify-center items-center w-full'
				>
					<button className='mt-8 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50'>
						<IoHomeOutline className='mr-2 h-5 w-5' />
						Back to Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Error;
