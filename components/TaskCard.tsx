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

const checkmarkContainer = cva("flex items-center justify-center h-4 group cursor-pointer")
const checkCard = cva('flex items-center gap-2 group')
const checkmarkIcon = cva('w-auto h-full fill-icons duration-100 ease-in-out')
// const checkCardBody = cva('h-full w-full py-2 transition-all duration-100 ease-in-out border-b border-transparent')
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
    groupId?: Id<"taskGroups">;
    priority: 'common' | "low" | "medium" | "high";
    description?: string;
    subtasksCount: number
  };
  hasMultipleTasks: boolean;
  handleTaskCheck: (taskId: Id<"tasks">, completed: boolean) => void;
  handleOpenContextMenu: (event: React.MouseEvent, taskId: Id<"tasks">) => void;
}

export default function TaskCard({ task, hasMultipleTasks, handleTaskCheck, handleOpenContextMenu }: TaskCardProps) {
  const { activeTaskId, setActiveTaskId } = useActiveTask();
  const isActive = task._id === activeTaskId;


  return (
    <li key={task._id} className={checkCard()} onClick={() => setActiveTaskId(task._id)}>
      <div className={checkCardContent( { active: isActive })}>
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

        {/* <div
          className={checkCardBody({
            className: `${task.completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${hasMultipleTasks ? "!border-gray-200" : ""}`,
          })}
        >
          {task.body}
        </div> */}

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
