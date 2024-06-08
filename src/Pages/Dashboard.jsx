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

import { Link } from 'react-router-dom';

export default function Dashboard() {
	const [currentOrder, setCurrentOrder] = useState('Oe31b70H');

	return (
		<div className='flex min-h-screen w-full flex-col bg-muted/40'>
			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								size='icon'
								variant='outline'
								className='sm:hidden'
							>
								<PanelLeft className='h-5 w-5' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side='left'
							className='sm:max-w-xs'
						>
							<nav className='grid gap-6 text-lg font-medium'>
								<Link
									href='#'
									className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
								>
									<Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
									<span className='sr-only'>Acme Inc</span>
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Home className='h-5 w-5' />
									Dashboard
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-foreground'
								>
									<ShoppingCart className='h-5 w-5' />
									Orders
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Package className='h-5 w-5' />
									Products
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<Users2 className='h-5 w-5' />
									Customers
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'
								>
									<LineChart className='h-5 w-5' />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<Breadcrumb className='hidden md:flex'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href='#'>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href='#'>Orders</Link>
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
								<Image
									src='https://github.com/shadcn.png'
									alt='User Avatar'
									width={32}
									height={32}
								/>
								<span className='sr-only'>Open user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium leading-none'>shadcn</p>
									<p className='text-xs leading-none text-muted-foreground'>
										m@shadcn.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<CreditCard className='mr-2 h-4 w-4' />
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<File className='mr-2 h-4 w-4' />
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
							<DropdownMenuCheckboxItem>Dark Mode</DropdownMenuCheckboxItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className='space-y-4 p-6'>
					<div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
						<h1 className='text-3xl font-semibold sm:text-4xl'>Orders</h1>
						<Button variant='default'>Add Order</Button>
					</div>
					<Separator />
					<div className='flex flex-col gap-4 md:flex-row'>
						<Card className='flex-1'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-lg font-medium'>
									Top Customers
								</CardTitle>
								<ListFilter className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>Emily James</p>
											<p className='text-xs text-muted-foreground'>
												emily@domain.com
											</p>
										</div>
										<Badge>+5%</Badge>
									</div>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>Michael Brown</p>
											<p className='text-xs text-muted-foreground'>
												michael@domain.com
											</p>
										</div>
										<Badge variant='outline'>+4%</Badge>
									</div>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>Sarah Parker</p>
											<p className='text-xs text-muted-foreground'>
												sarah@domain.com
											</p>
										</div>
										<Badge variant='destructive'>-2%</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className='flex-1'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-lg font-medium'>
									Latest Orders
								</CardTitle>
								<ListFilter className='h-4 w-4 text-muted-foreground' />
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>#1234</p>
											<p className='text-xs text-muted-foreground'>
												₹29.99 • 10 mins ago
											</p>
										</div>
										<Badge>New</Badge>
									</div>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>#1233</p>
											<p className='text-xs text-muted-foreground'>
												₹89.99 • 1 hour ago
											</p>
										</div>
										<Badge variant='outline'>Processing</Badge>
									</div>
									<div className='flex items-center'>
										<div className='flex flex-1 flex-col text-sm'>
											<p className='font-medium leading-none'>#1232</p>
											<p className='text-xs text-muted-foreground'>
												₹49.99 • 2 hours ago
											</p>
										</div>
										<Badge variant='destructive'>Failed</Badge>
									</div>
								</div>
							</CardContent>
						</Card>
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
