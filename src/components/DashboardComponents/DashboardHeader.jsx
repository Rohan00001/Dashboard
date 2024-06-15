import React from 'react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
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
import { Search } from 'lucide-react';
import { CreditCard, Copy, Users2 } from 'lucide-react';
import { CiSettings } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
	return (
		<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
			<Breadcrumb className='hidden md:flex'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='#'>Dashboard</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to='#'>Orders</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Recent Orders</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='relative ml-auto flex-1 md:grow-0'>
				<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				<Input
					type='search'
					placeholder='Search...'
					className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]'
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						size='icon'
						className='overflow-hidden rounded-full'
					>
						<FaRegUserCircle className='h-8 w-8' />
						<span className='sr-only'>Open user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel className='font-normal'>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>John Doe</p>
							<p className='text-xs leading-none text-muted-foreground'>
								jhondoe@gmail.com
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<CreditCard className='mr-2 h-4 w-4' />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CiSettings className='mr-2 h-4 w-4' />
						<span>Settings</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Users2 className='mr-2 h-4 w-4' />
						<span>Team</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Copy className='mr-2 h-4 w-4' />
						<span>Copy</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default DashboardHeader;
