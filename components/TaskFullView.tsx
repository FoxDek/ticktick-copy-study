'use client';

import { Id } from "@/convex/_generated/dataModel";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import ChecklistIcon from "@/public/checklist-icon.svg";
import DescriptionIcon from "@/public/description-icon.svg";
import PriorityIcon from "@/public/priority-icon.svg";
import ChecklistMarkIcon from "@/public/checklist-mark-icon.svg";
import { cva } from "class-variance-authority";
import IconButton from './IconButton';
import { useEffect, useState } from "react";
import PriorityMenu from "./PriorityMenu";
import { priorityColor, priorityColorCheckmark } from "@/app/utils/priorityColors";
import { useTaskActions } from "@/app/hoocs/useTaskActions";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import EditableTaskBody from "./EditableTaskBody";
import EditableTaskDescription from "./EditableTaskDescription";
import TaskSubtasksList from "./TaskSubtasksList";

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
  description?: string;
  subtasksCount: number;
}

interface Subtask {
  _id: string;
  body: string;
  completed: boolean;
}

const checkmarkContainer = cva("checkmarkContainer flex items-center justify-center h-4 group cursor-pointer mr-3");
const checkmarkIcon = cva('checkmarkIcon w-full h-full duration-100 ease-in-out');
const fullTaskTop = cva("fullTaskTop flex justify-between px-5 pt-5 pb-3 border-b border-gray-200");
const figureLine = cva("w-[1px] h-[16px] bg-gray-300");
const taskFullView = cva("taskFullView h-full flex flex-col");
const fullTaskMiddle = cva("fullTaskMiddle p-6 flex-1");
const fullTaskBottom = cva("fullTaskBottom flex items-center justify-between px-6 pt-6 pb-4");
const taskGroupToggler = cva("taskGroupToggler text-sm p-1 hover:bg-gray-100 cursor-pointer rounded-sm duration-100 ease-in-out");
const fullTaskBottomButtons = cva("fullTaskBottomButtons");
const iconSvg = cva('iconSvg w-full h-full fill-icons');


export default function TaskFullView({ taskData, subtasks }: { taskData: Task | null | undefined, subtasks: Subtask[] | null | undefined }) {
  const [priorityContextMenuIsOpen, setPriorityContextMenuIsOpen] = useState(false);
  const [listDescToggler, setListDescToggler] = useState('desc');
  const {handleTaskCheck} = useTaskActions();
  const addSubtask = useMutation(api.subtasksFunctions.addSubtask);
  const {handleSubtasksCountChange} = useTaskActions();

  useEffect(() => {
    if (taskData && taskData.subtasksCount === 0) {
      if (listDescToggler === 'list') {
        addSubtask({taskId: taskData._id, body: ''});
        handleSubtasksCountChange(taskData._id, 1);
      }
    }
  }, [listDescToggler]);

  if (!taskData) {
    return null;
  }

  return (
    <div className={taskFullView()}>
      <div className={fullTaskTop()}>
        <div className="flex items-center">
          <span className={checkmarkContainer()} onClick={() => taskData && handleTaskCheck(taskData?._id, !taskData?.completed)}>
            {taskData.completed ? (
            <CheckmarkIcon
              className={checkmarkIcon({
                className: `fill-icons opacity-30 hover:opacity-100`,
              })}
            />
          ) : taskData.subtasksCount > 0 ? (
            <ChecklistMarkIcon
              className={checkmarkIcon({
                className: `${taskData?.priority && priorityColorCheckmark[taskData?.priority]} text-transparent`,
              })}
            />
          ) : <EmptyCheckmarkIcon
              className={checkmarkIcon({
                className: `${taskData?.priority && priorityColorCheckmark[taskData?.priority]} text-transparent`,
              })}
            />}
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
        <div className="flex justify-between">

          <EditableTaskBody taskId={taskData._id} completed={taskData.completed} body={taskData.body}/>


          <IconButton onClick={() => setListDescToggler(listDescToggler === 'desc' ? 'list' : 'desc')} addClasses='!max-h-6.5'>
            {listDescToggler === 'desc'
              ? <ChecklistIcon className={iconSvg()}/> 
              : <DescriptionIcon className={iconSvg()}/>}
          </IconButton>
        </div>

        <div className="my-3">
          <EditableTaskDescription description={taskData.description} taskId={taskData._id}/>
        </div>

          <TaskSubtasksList taskId={taskData._id} subtasks={subtasks} listDescToggler={listDescToggler} subtaskCount={taskData.subtasksCount}/>

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
