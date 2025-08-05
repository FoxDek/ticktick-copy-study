'use client';

import { Id } from "@/convex/_generated/dataModel";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import ChecklistIcon from "@/public/checklist-icon.svg";
// import DescriptionIcon from "@/public/description-icon.svg";
import PriorityIcon from "@/public/priority-icon.svg";
import { cva } from "class-variance-authority";
import IconButton from './IconButton';
import { useState } from "react";
import PriorityMenu from "./PriorityMenu";
import { priorityColor, priorityColorCheckmark } from "@/app/utils/priorityColors";
import { useTaskActions } from "@/app/hoocs/useTaskActions";

type Priority = 'common' | 'low' | 'medium' | 'high';

interface Task {
  _id: Id<"tasks">;
  _creationTime: number;
  userId: Id<"users">;
  body: string;
  completed: boolean;
  dueDate?: string;
  groupId?: Id<"taskGroups">;
  priority: Priority;
  subtasks?: {
    _id: string;
    body: string;
    completed: boolean;
  }[];
}


const checkmarkContainer = cva("checkmarkContainer flex items-center justify-center h-4 group cursor-pointer mr-3");
const checkmarkIcon = cva('checkmarkIcon w-full h-full duration-100 ease-in-out');
const fullTaskTop = cva("fullTaskTop flex justify-between px-6 pt-6 pb-4 border-b border-gray-200");
const figureLine = cva("w-[1px] h-[16px] bg-gray-300");
const taskFullView = cva("taskFullView h-full flex flex-col");
const fullTaskMiddle = cva("fullTaskMiddle p-6 flex-1");
const fullTaskBody = cva("fullTaskBody text-xl font-bold");
const fullTaskBottom = cva("fullTaskBottom flex items-center justify-between px-6 pt-6 pb-4");
const taskGroupToggler = cva("taskGroupToggler text-sm p-1 hover:bg-gray-100 cursor-pointer rounded-sm duration-100 ease-in-out");
const fullTaskBottomButtons = cva("fullTaskBottomButtons");
const iconSvg = cva('iconSvg w-full h-full fill-icons');


export default function TaskFullView({ taskData }: { taskData: Task | null | undefined }) {
  const [priorityContextMenuIsOpen, setPriorityContextMenuIsOpen] = useState(false);
  const {handleTaskCheck} = useTaskActions();

  const logAboba = () => {
    console.log('aboba')
  }

  return (
    <div className={taskFullView()}>
      <div className={fullTaskTop()}>
        <div className="flex items-center">
          <span className={checkmarkContainer()} onClick={() => taskData && handleTaskCheck(taskData?._id, !taskData?.completed)}>
            {taskData?.completed ? (
              <CheckmarkIcon
                className={checkmarkIcon({
                  className: `fill-icons opacity-30 hover:opacity-100`,
                })}
              />
            ) : (
              <EmptyCheckmarkIcon
                className={checkmarkIcon({
                  className: `${taskData?.priority && priorityColorCheckmark[taskData?.priority]} text-transparent`,
                })}
              />
            )}
          </span>
          <figure className={figureLine()} />
          <span className="text-gray-400 text-sm ml-3">
            Когда выполнить
          </span>
        </div>
        <div className="">
          <IconButton onClick={() => setPriorityContextMenuIsOpen(!priorityContextMenuIsOpen)}>
            <PriorityIcon className={iconSvg({ className: `text-transparent ${taskData?.priority && priorityColor[taskData?.priority]}` })} />
          </IconButton>
        </div>


        { priorityContextMenuIsOpen && taskData && <PriorityMenu priority={taskData.priority} taskId={taskData._id}/>  }


      </div>
      <div className={fullTaskMiddle()}>
        <div className="flex justify-between gap-">
          <h2 className={fullTaskBody()}>{taskData?.body}</h2>
          <IconButton onClick={logAboba} addClasses='!max-h-6'>
            <ChecklistIcon className={iconSvg()} />
          </IconButton>
        </div>
      </div>
      <div className={fullTaskBottom()}>
        <button className={taskGroupToggler()}>
          {taskData?.groupId ? taskData?.groupId : "Без группы"}
        </button>
        <div className={fullTaskBottomButtons()}>
          <IconButton onClick={() => { console.log('abiba') }}>
            <TrashIcon className={iconSvg()} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
