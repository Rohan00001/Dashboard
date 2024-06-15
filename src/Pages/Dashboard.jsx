import { useState } from 'react';
import {
	Copy,
	CreditCard,
	File,
	Home,
	Image,
	LineChart,
	ListFilter,
	Package,
	Package2,
	PanelLeft,
	Search,
	ShoppingCart,
	Users2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CiSettings } from 'react-icons/ci';

import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import LatestOrders from '@/components/DashboardComponents/LatestOrder';
import TopCustomers from '@/components/DashboardComponents/TopCustomers ';
import DashboardHeader from '@/components/DashboardComponents/DashboardHeader';

export default function Dashboard() {
	const [currentOrder, setCurrentOrder] = useState('Oe31b70H');

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<DashboardHeader />
				<main className='space-y-4 p-6'>
					<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
						<h1 className='text-3xl font-semibold sm:text-4xl'>Orders</h1>
						<Button variant='default'>Add Order</Button>
					</div>
					<Separator />
					<div className='flex flex-col gap-4 md:flex-row'>
						<TopCustomers />
						<LatestOrders />
					</div>
					<Separator />
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-[100px]'>Order ID</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Total</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>#1234</TableCell>
								<TableCell>
									<Badge>New</Badge>
								</TableCell>
								<TableCell>Emily James</TableCell>
								<TableCell>₹29.99</TableCell>
								<TableCell className='text-right'>
									<Button
										variant='outline'
										size='sm'
									>
										View
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>#1233</TableCell>
								<TableCell>
									<Badge variant='outline'>Processing</Badge>
								</TableCell>
								<TableCell>Michael Brown</TableCell>
								<TableCell>₹89.99</TableCell>
								<TableCell className='text-right'>
									<Button
										variant='outline'
										size='sm'
									>
										View
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>{currentOrder}</TableCell>
								<TableCell>
									<Badge variant='destructive'>Failed</Badge>
								</TableCell>
								<TableCell>Sarah Parker</TableCell>
								<TableCell>₹49.99</TableCell>
								<TableCell className='text-right'>
									<Button
										variant='outline'
										size='sm'
									>
										View
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</main>
			</div>
		</div>
	);
}
