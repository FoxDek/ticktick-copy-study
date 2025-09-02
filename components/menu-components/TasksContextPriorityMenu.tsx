'use client'
import { cva } from "class-variance-authority";
import PriorityIcon from "@/public/priority-icon.svg";
import { priorityColor } from "@/app/utils/priorityColors";
import { Id } from "@/convex/_generated/dataModel";
import { useTaskActions } from "@/app/hoocs/useTaskActions";

interface PriorityMenuProps {
  priority: Priority;
  taskId: Id<'tasks'>;
}

type Priority = 'common' | 'low' | 'medium' | 'high' | undefined;

const priorityMenu = cva('priorityMenu flex justify-between items-center gap-3');
const priorityMenuItem = cva('priorityMenuItem flex items-center gap-1 p-1 hover:bg-gray-100 cursor-pointer rounded-md duration-100 ease-in-out', {
  variants: {
    active: {
      true: 'bg-gray-100',
    }
  }
});
const priorityMenuItemIcon = cva('priorityMenuItemIcon flex items-center justify-center h-6.5 p-1.5');
const iconSvg = cva('iconSvg w-full h-full fill-icons');


export default function TasksContextPriorityMenu({priority, taskId}: PriorityMenuProps) {
  const {handleTaskChangePriority} = useTaskActions()

  if (!taskId || !priority) return (
    <div className="px-1 flex flex-col gap-2">
      <div className="h-4 w-15 rounded-md bg-gray-200 animate-pulse"></div>
      <ul className="flex justify-between items-center gap-3">
      {Array(4).fill(null).map((_, i) => (
        <li key={i} className="flex items-center gap-1 rounded-md">
          <span className="flex items-center justify-center aspect-square w-7 bg-gray-200 rounded-md animate-pulse" />
        </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="flex flex-col gap-1 mb-4">
      <span className="text-xs opacity-50 px-2">Приоритет</span>
      <ul className={priorityMenu()}>
        <li className={priorityMenuItem({ active: priority === 'high' })} onClick={() => handleTaskChangePriority(taskId, 'high')}>
          <span className={priorityMenuItemIcon()}>
            <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.high}` })} />
          </span>
        </li>
        <li className={priorityMenuItem({ active: priority === 'medium' })} onClick={() => handleTaskChangePriority(taskId, 'medium')}>
          <span className={priorityMenuItemIcon()}>
            <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.medium}` })} />
          </span>
        </li>
        <li className={priorityMenuItem({ active: priority === 'low' })} onClick={() => handleTaskChangePriority(taskId, 'low')}>
          <span className={priorityMenuItemIcon()}>
            <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.low}` })} />
          </span>
        </li>
        <li className={priorityMenuItem({ active: priority === 'common' })} onClick={() => handleTaskChangePriority(taskId, 'common')}>
          <span className={priorityMenuItemIcon()}>
            <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.common}` })} />
          </span>
        </li>
      </ul>
      <figure className="absolute left-0 w-full h-0.25 top-18 bg-gray-100"></figure>
    </div>
  );
}