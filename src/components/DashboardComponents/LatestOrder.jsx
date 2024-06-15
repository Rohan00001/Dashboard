// src/components/LatestOrders.jsx

import React from 'react';
import { ListFilter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { latestOrders } from '@/Constants/DashboardCardData';

const LatestOrders = () => {
	return (
		<Card className='flex-1'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-lg font-medium'>Latest Orders</CardTitle>
				<ListFilter className='h-4 w-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{latestOrders.map((order) => (
						<div
							key={order.id}
							className='flex items-center'
						>
							<div className='flex flex-1 flex-col text-sm'>
								<p className='font-medium leading-none'>{order.id}</p>
								<p className='text-xs text-muted-foreground'>
									{order.price} • {order.time}
								</p>
							</div>
							<Badge variant={order.variant}>{order.status}</Badge>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default LatestOrders;
