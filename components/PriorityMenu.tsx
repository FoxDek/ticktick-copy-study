'use client'
import { cva } from "class-variance-authority";
import PriorityIcon from "@/public/priority-icon.svg";
import CheckIcon from "@/public/check-icon.svg";
import { priorityColor } from "@/app/utils/priorityColors";
import { Id } from "@/convex/_generated/dataModel";
import { useTaskActions } from "@/app/hoocs/useTaskActions";

interface PriorityMenuProps {
  priority: Priority;
  taskId: Id<'tasks'>;
}

type Priority = 'common' | 'low' | 'medium' | 'high';

const priorityMenu = cva('priorityMenu absolute top-15 right-5 bg-white border border-gray-200 shadow-lg rounded-md p-1 z-10');
const priorityMenuItem = cva('priorityMenuItem flex items-center gap-1 py-1 px-1.5 hover:bg-gray-100 cursor-pointer');
const priorityMenuItemIcon = cva('priorityMenuItemIcon flex items-center justify-center h-6.5 p-1.5');
const priorityMenuItemLabel = cva('priorityMenuItemlabel text-sm mr-15');
const iconSvg = cva('iconSvg w-full h-full fill-icons');
const checkIconCvg = cva('fill-purple-400 w-3 absolute right-3')


export default function PriorityMenu({priority, taskId}: PriorityMenuProps) {
  const {handleTaskChangePriority} = useTaskActions()

  return (
    <ul className={priorityMenu()}>

      <li className={priorityMenuItem()} onClick={() => handleTaskChangePriority(taskId, 'high')}>
        <span className={priorityMenuItemIcon()}>
          <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.high}` })} />
        </span>
        <span className={priorityMenuItemLabel({ className: `${priority === "high" && "text-purple-400"}`})}>Высокий</span>
        {priority === "high" && <CheckIcon className={checkIconCvg()} /> }
      </li>

      <li className={priorityMenuItem()} onClick={() => handleTaskChangePriority(taskId, 'medium')}>
        <span className={priorityMenuItemIcon()}>
          <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.medium}` })} />
        </span>
        <span className={priorityMenuItemLabel({ className: `${priority === "medium" && "text-purple-400"}`})}>Средний</span>
        {priority === "medium" && <CheckIcon className={checkIconCvg()} /> }
      </li>

      <li className={priorityMenuItem()} onClick={() => handleTaskChangePriority(taskId, 'low')}>
        <span className={priorityMenuItemIcon()}>
          <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.low}` })} />
        </span>
        <span className={priorityMenuItemLabel({ className: `${priority === "low" && "text-purple-400"}`})}>Низкий</span>
        {priority === "low" && <CheckIcon className={checkIconCvg()} /> }
      </li>

      <li className={priorityMenuItem()} onClick={() => handleTaskChangePriority(taskId, 'common')}>
        <span className={priorityMenuItemIcon()}>
          <PriorityIcon className={iconSvg({ className: `${priority && priorityColor.common}` })} />
        </span>
        <span className={priorityMenuItemLabel({ className: `${priority === "common" && "text-purple-400"}`})}>Обычный</span>
        {priority === "common" && <CheckIcon className={checkIconCvg()} /> }
      </li>
    </ul>
  );
}