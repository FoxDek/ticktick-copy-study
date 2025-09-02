'use client';

import { cva } from "class-variance-authority"
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import MoreIcon from "@/public/more-icon.svg";
import ChecklistMarkIcon from "@/public/checklist-mark-icon.svg";
import { Id } from "@/convex/_generated/dataModel";
import { priorityColorCheckmark } from '../app/utils/priorityColors';
import { useActiveTask } from "./ActiveTaskProvider";
import EditableCheckCardBody from "./EditableCheckCardBody";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

const checkmarkContainer = cva("flex items-center justify-center h-4 group cursor-pointer")
const checkCard = cva('relative flex items-center gap-2 group')
const checkmarkIcon = cva('w-auto h-full fill-icons duration-100 ease-in-out')
const checkCardGroup = cva('absolute right-9 flex items-center gap-2 max-w-30')
const checkCardGroupBody = cva("whitespace-nowrap select-none text-xs hover:underline cursor-pointer opacity-50 truncate")
const checkCardGroupLabel = cva('w-2 h-2 rounded-full')
const checkCardContent = cva("w-full flex flex-row items-center gap-2 group-hover:bg-gray-100 rounded-md text-sm px-4 duration-100 ease-in-out", {
  variants: {
    active: {
      true: "bg-[#c1b6ec2c]",
      false: "bg-transparent",
    }
  }
})

interface TaskCardProps {
  task: {
    _id: Id<"tasks">;
    _creationTime: number;
    userId: Id<"users">;
    body: string;
    completed: boolean;
    dueDate?: string;
    groupId?: Id<"taskGroups"> | null;
    priority: 'common' | "low" | "medium" | "high";
    description?: string;
    subtasksCount: number
  };
  hasMultipleTasks: boolean;
  handleTaskCheck: (taskId: Id<"tasks">, completed: boolean) => void;
  handleOpenContextMenu: (event: React.MouseEvent, taskId: Id<"tasks">) => void;
  activeGroup: string
}

export default function TaskCard({ task, hasMultipleTasks, handleTaskCheck, handleOpenContextMenu, activeGroup }: TaskCardProps) {
  const { activeTaskId, setActiveTaskId } = useActiveTask();
  const isActive = task._id === activeTaskId;
  const groupData = useQuery(
    api.groupsFunctions.getCustomGroup,
    task.groupId ? { groupId: task.groupId } : "skip"
  );

  return (
    <li key={task._id} className={checkCard()} onClick={() => setActiveTaskId(task._id)}>
      <div className={checkCardContent({ active: isActive, className: groupData?.color && `rounded-l-none relative after:content-[''] after:absolute after:-left-0.75 after:w-0.75 after:h-full after:bg-[var(--line-color)]` })} style={{ "--line-color": groupData?.color } as React.CSSProperties}>
        <span
          className={checkmarkContainer()}
          onClick={() => handleTaskCheck(task._id, !task.completed)}
        >
          {task.completed ? (
            <CheckmarkIcon
              className={checkmarkIcon({
                className: `fill-icons opacity-30 hover:opacity-100`,
              })}
            />
          ) : task.subtasksCount > 0 ? (
            <ChecklistMarkIcon
              className={checkmarkIcon({
                className: `${priorityColorCheckmark[task.priority]} text-transparent`,
              })}
            />
          ) : <EmptyCheckmarkIcon
              className={checkmarkIcon({
                className: `${priorityColorCheckmark[task.priority]} text-transparent`,
              })}
            />}
        </span>

        <EditableCheckCardBody taskId={task._id} completed={task.completed} body={task.body} hasMultipleTasks={hasMultipleTasks}/>

        {groupData && activeGroup !== groupData._id &&
        <div className={checkCardGroup()}>
          <div className={checkCardGroupLabel({className:`bg-[${groupData.color}]`})}></div>
          <Link href={`/tasks/${groupData._id}`} className={checkCardGroupBody()}>{groupData.name}</Link>
        </div>
        }

      </div>
      <div className="w-[10px]">
        <button
          className={`cursor-pointer hidden group-hover:block`}
          onClick={(e) => handleOpenContextMenu(e, task._id)}
        >
          <MoreIcon className="w-full h-full fill-icons opacity-70" />
        </button>
      </div>
    </li>
  );
}
