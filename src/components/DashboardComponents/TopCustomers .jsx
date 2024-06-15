// src/components/TopCustomers.jsx

import React from 'react';
import { ListFilter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topCustomers } from '@/Constants/DashboardCardData';

const TopCustomers = () => {
	return (
		<Card className='flex-1'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-lg font-medium'>Top Customers</CardTitle>
				<ListFilter className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{topCustomers.map((customer) => (
						<div
							key={customer.email}
							className='flex items-center'
						>
							<div className='flex flex-1 flex-col text-sm'>
								<p className='font-medium leading-none'>{customer.name}</p>
								<p className='text-xs text-muted-foreground'>
									{customer.email}
								</p>
							</div>
							<Badge variant={customer.variant}>{customer.change}</Badge>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default TopCustomers;
