import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';
import { Badge } from './ui/badge';
import { cva } from 'class-variance-authority';

export function TaskCard({ task, isOverlay }) {
	const [isDragging, setIsDragging] = useState(false);

	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({
			id: task.id,
			data: { type: 'Task', task },
			attributes: { roleDescription: 'Task' },
			dragging: setIsDragging,
		});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva('', {
		variants: {
			dragging: {
				over: 'ring-2 opacity-30',
				overlay: 'ring-2 ring-primary',
			},
		},
	});

	return (
		<Card
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
			})}
		>
			<CardHeader className='px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative'>
				<Button
					variant='ghost'
					{...attributes}
					{...listeners}
					className='p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab'
				>
					<span className='sr-only'>Move task</span>
					<GripVertical />
				</Button>
				<Badge
					variant='outline'
					className='ml-auto font-semibold'
				>
					Task
				</Badge>
			</CardHeader>
			<CardContent className='px-3 pt-3 pb-6 text-left whitespace-pre-wrap'>
				{task.content}
			</CardContent>
		</Card>
	);
}
