import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

function Charts() {
	const lineChartRef = useRef(null);
	const pieChartRef = useRef(null);
	const barChartRef = useRef(null);

	useEffect(() => {
		const createLineChart = () => {
			if (lineChartRef.current) {
				if (lineChartRef.current.chartInstance) {
					lineChartRef.current.chartInstance.destroy();
				}

				lineChartRef.current.chartInstance = new Chart(lineChartRef.current, {
					type: 'line',
					data: {
						labels: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
						],
						datasets: [
							{
								label: 'Sales',
								data: [65, 59, 80, 81, 56, 55, 40],
								fill: false,
								borderColor: 'rgb(75, 192, 192)',
								tension: 0.1,
							},
						],
					},
					options: {
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					},
				});
			}
		};

		const createPieChart = () => {
			if (pieChartRef.current) {
				if (pieChartRef.current.chartInstance) {
					pieChartRef.current.chartInstance.destroy();
				}

				pieChartRef.current.chartInstance = new Chart(pieChartRef.current, {
					type: 'pie',
					data: {
						labels: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
							'August',
							'September',
							'October',
							'November',
							'December',
						],
						datasets: [
							{
								label: '# of Votes',
								data: [10, 20, 15, 25, 35, 30, 20, 10, 15, 20, 25, 30],
								backgroundColor: [
									'red',
									'blue',
									'yellow',
									'green',
									'purple',
									'orange',
									'pink',
									'brown',
									'gray',
									'black',
									'cyan',
									'magenta',
								],
							},
						],
					},
				});
			}
		};

		const createBarChart = () => {
			if (barChartRef.current) {
				if (barChartRef.current.chartInstance) {
					barChartRef.current.chartInstance.destroy();
				}

				barChartRef.current.chartInstance = new Chart(barChartRef.current, {
					type: 'bar',
					data: {
						labels: [
							'January',
							'February',
							'March',
							'April',
							'May',
							'June',
							'July',
						],
						datasets: [
							{
								label: '# of Votes',
								data: [12, 19, 3, 5, 2, 3, 7],
								backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)',
									'rgba(255, 99, 132, 0.2)',
								],
								borderColor: [
									'rgba(255, 99, 132, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)',
								],
								borderWidth: 1,
							},
						],
					},
					options: {
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					},
				});
			}
		};

		createLineChart();
		createPieChart();
		createBarChart();

		return () => {
			if (lineChartRef.current && lineChartRef.current.chartInstance) {
				lineChartRef.current.chartInstance.destroy();
			}
			if (pieChartRef.current && pieChartRef.current.chartInstance) {
				pieChartRef.current.chartInstance.destroy();
			}
			if (barChartRef.current && barChartRef.current.chartInstance) {
				barChartRef.current.chartInstance.destroy();
			}
		};
	}, []);

	return (
		<div className='flex flex-col gap-4'>
			<header className='sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
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
								<Link to='#'>Calendar</Link>
							</BreadcrumbLink>
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
			</header>
			<main className='grid gap-4 sm:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Line Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<canvas ref={lineChartRef}></canvas>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Bar Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<canvas ref={barChartRef}></canvas>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Pie Chart</CardTitle>
					</CardHeader>
					<CardContent>
						<canvas ref={pieChartRef}></canvas>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

export default Charts;
