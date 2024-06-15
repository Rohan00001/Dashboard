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
		// Drag over logic...
	}

	return (
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
