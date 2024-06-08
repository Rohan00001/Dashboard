import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { IoSettingsOutline } from 'react-icons/io5';
import { Switch } from '../ui/switch';
import { useState } from 'react';

export function ThemeChanger() {
	const [checked, setChecked] = useState(false);

	const changeTheme = () => {
		setChecked(!checked);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='navButton'>
					<IoSettingsOutline className='h-5 w-5 text-gray-400' /> &nbsp;
					Settings
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Change Theme</SheetTitle>
					<SheetDescription>Change your theme settings</SheetDescription>
				</SheetHeader>
				<div className='space-y-4 my-4'>
					<div className='flex items-center space-x-3'>
						<Switch
							id='theme-changer'
							onChange={changeTheme}
						/>
						<span className='text-sm text-gray-500'>
							{checked ? 'Dark mode enabled' : 'Dark mode disabled'}
						</span>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
