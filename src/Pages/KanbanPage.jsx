import React, { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
	DndContext,
	DragOverlay,
	useSensor,
	useSensors,
	KeyboardSensor,
	TouchSensor,
	MouseSensor,
	useDndContext,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { BoardColumn } from '@/components/BoardColumn';
import { TaskCard } from '@/components/TaskCard';
import { hasDraggableData } from '@/components/utils';
import { coordinateGetter } from '@/components/multipleContainersKeyboardPreset';
import { cva } from 'class-variance-authority';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const defaultCols = [
	{
		id: 'todo',
		title: 'Todo',
	},
	{
		id: 'in-progress',
		title: 'In progress',
	},
	{
		id: 'done',
		title: 'Done',
	},
];

const initialTasks = [
	{
		id: 'task1',
		columnId: 'done',
		content: 'Project initiation and planning',
	},
	{
		id: 'task2',
		columnId: 'done',
		content: 'Gather requirements from stakeholders',
	},
	{
		id: 'task3',
		columnId: 'done',
		content: 'Create wireframes and mockups',
	},
	{
		id: 'task4',
		columnId: 'in-progress',
		content: 'Develop homepage layout',
	},
	{
		id: 'task5',
		columnId: 'in-progress',
		content: 'Design color scheme and typography',
	},
	{
		id: 'task6',
		columnId: 'todo',
		content: 'Implement user authentication',
	},
	{
		id: 'task7',
		columnId: 'todo',
		content: 'Build contact us page',
	},
	{
		id: 'task8',
		columnId: 'todo',
		content: 'Create product catalog',
	},
	{
		id: 'task9',
		columnId: 'todo',
		content: 'Develop about us page',
	},
	{
		id: 'task10',
		columnId: 'todo',
		content: 'Optimize website for mobile devices',
	},
	{
		id: 'task11',
		columnId: 'todo',
		content: 'Integrate payment gateway',
	},
	{
		id: 'task12',
		columnId: 'todo',
		content: 'Perform testing and bug fixing',
	},
	{
		id: 'task13',
		columnId: 'todo',
		content: 'Launch website and deploy to server',
	},
];

function KanbanPage() {
	const [columns, setColumns] = useState(defaultCols);
	const pickedUpTaskColumn = useRef(null);
	const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
	const [tasks, setTasks] = useState(initialTasks);
	const [activeColumn, setActiveColumn] = useState(null);
	const [activeTask, setActiveTask] = useState(null);
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: coordinateGetter,
		})
	);

	function getDraggingTaskData(taskId, columnId) {
		const tasksInColumn = tasks.filter((task) => task.columnId === columnId);
		const taskPosition = tasksInColumn.findIndex((task) => task.id === taskId);
		const column = columns.find((col) => col.id === columnId);
		return {
			tasksInColumn,
			taskPosition,
			column,
		};
	}

	const announcements = {
		onDragStart({ active }) {
			if (!hasDraggableData(active)) return;
			if (active.data.current?.type === 'Column') {
				const startColumnIdx = columnsId.findIndex((id) => id === active.id);
				const startColumn = columns[startColumnIdx];
				return `Picked up Column ${startColumn?.title} at position: ${
					startColumnIdx + 1
				} of ${columnsId.length}`;
			} else if (active.data.current?.type === 'Task') {
				pickedUpTaskColumn.current = active.data.current.task.columnId;
				const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
					active.id,
					pickedUpTaskColumn.current
				);
				return `Picked up Task ${
					active.data.current.task.content
				} at position: ${taskPosition + 1} of ${
					tasksInColumn.length
				} in column ${column?.title}`;
			}
		},

		// Other announcement functions...
		onDragOver({ active, over }) {
			if (!hasDraggableData(active) || !hasDraggableData(over)) return;

			if (
				active.data.current?.type === 'Column' &&
				over.data.current?.type === 'Column'
			) {
				const overColumnIdx = columnsId.findIndex((id) => id === over.id);
				return `Column ${active.data.current.column.title} was moved over ${
					over.data.current.column.title
				} at position ${overColumnIdx + 1} of ${columnsId.length}`;
			} else if (
				active.data.current?.type === 'Task' &&
				over.data.current?.type === 'Task'
			) {
				const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
					over.id,
					over.data.current.task.columnId
				);
				if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
					return `Task ${
						active.data.current.task.content
					} was moved over column ${column?.title} in position ${
						taskPosition + 1
					} of ${tasksInColumn.length}`;
				}
				return `Task was moved over position ${taskPosition + 1} of ${
					tasksInColumn.length
				} in column ${column?.title}`;
			}
		},
		onDragEnd({ active, over }) {
			if (!hasDraggableData(active) || !hasDraggableData(over)) {
				pickedUpTaskColumn.current = null;
				return;
			}
			if (
				active.data.current?.type === 'Column' &&
				over.data.current?.type === 'Column'
			) {
				const overColumnPosition = columnsId.findIndex((id) => id === over.id);

				return `Column ${
					active.data.current.column.title
				} was dropped into position ${overColumnPosition + 1} of ${
					columnsId.length
				}`;
			} else if (
				active.data.current?.type === 'Task' &&
				over.data.current?.type === 'Task'
			) {
				const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
					over.id,
					over.data.current.task.columnId
				);
				if (over.data.current.task.columnId !== pickedUpTaskColumn.current) {
					return `Task was dropped into column ${column?.title} in position ${
						taskPosition + 1
					} of ${tasksInColumn.length}`;
				}
				return `Task was dropped into position ${taskPosition + 1} of ${
					tasksInColumn.length
				} in column ${column?.title}`;
			}
			pickedUpTaskColumn.current = null;
		},
		onDragCancel({ active }) {
			pickedUpTaskColumn.current = null;
			if (!hasDraggableData(active)) return;
			return `Dragging ${active.data.current?.type} cancelled.`;
		},
	};

	function onDragStart(event) {
		if (!hasDraggableData(event.active)) return;
		const data = event.active.data.current;
		if (data?.type === 'Column') {
			setActiveColumn(data.column);
			return;
		}

		if (data?.type === 'Task') {
			setActiveTask(data.task);
			return;
		}
	}

	function onDragEnd(event) {
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (!hasDraggableData(active)) return;

		const activeData = active.data.current;

		if (activeId === overId) return;

		const isActiveAColumn = activeData?.type === 'Column';
		if (!isActiveAColumn) return;

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
			const overColumnIndex = columns.findIndex((col) => col.id === overId);
			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function onDragOver(event) {
		const { active, over } = event;
		if (!active || !over) return;

		const activeId = active.id;
		const overId = over.id;

		if (!hasDraggableData(active)) return;

		const activeData = active.data.current;

		if (activeId === overId) return;

		const isActiveAColumn = activeData?.type === 'Column';
		if (!isActiveAColumn) return;

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
			const overColumnIndex = columns.findIndex((col) => col.id === overId);
			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	return (
		<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
			<header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
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
								<Link href='#'>Products</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>All Products</BreadcrumbPage>
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
			<DndContext
				announcements={announcements}
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<BoardContainer>
					<SortableContext items={columnsId}>
						{columns.map((col) => (
							<BoardColumn
								key={col.id}
								column={col}
								tasks={tasks.filter((task) => task.columnId === col.id)}
							/>
						))}
					</SortableContext>
				</BoardContainer>

				{'document' in window &&
					createPortal(
						<DragOverlay>
							{activeColumn && (
								<BoardColumn
									isOverlay
									column={activeColumn}
									tasks={tasks.filter(
										(task) => task.columnId === activeColumn.id
									)}
								/>
							)}
							{activeTask && (
								<TaskCard
									task={activeTask}
									isOverlay
								/>
							)}
						</DragOverlay>,
						document.body
					)}
			</DndContext>
		</div>
	);
}

export default KanbanPage;

export function BoardContainer({ children }) {
	const dndContext = useDndContext();

	const variations = cva('px-2 md:px-0 flex lg:justify-center pb-4', {
		variants: {
			dragging: {
				default: 'snap-x snap-mandatory',
				active: 'snap-none',
			},
		},
	});

	return (
		<ScrollArea
			className={variations({
				dragging: dndContext.active ? 'active' : 'default',
			})}
		>
			<div className='flex gap-4 items-center flex-row justify-center'>
				{children}
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
}
