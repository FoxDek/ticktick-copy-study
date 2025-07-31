'use client';

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";
import { cva } from "class-variance-authority";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import MoreIcon from "@/public/more-icon.svg";

const checkmarkContainer = cva("flex items-center justify-center w-4 group cursor-pointer")
const checkCard = cva('flex items-center gap-2 group')
const checkmarkIcon = cva('w-full h-full fill-icons')
const checkCardBody = cva('h-full w-full py-2 transition-all duration-100 ease-in-out border-b border-transparent')
const checkCardContent = cva("w-full flex flex-row items-center gap-2 group-hover:bg-gray-100 rounded-md text-sm px-4 duration-100 ease-in-out", {
  variants: {
    active: {
      true: "bg-[#c1b6ec2c]",
      false: "bg-transparent",
    }
  }
})

export default function TasksList() {
  const data = useQuery(api.tasksFunctions.getTasks);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    taskId: Id<'tasks'> | null;
    position: { x: number; y: number };
  }>({ isOpen: false, taskId: null, position: { x: 0, y: 0 } });

  const updateTask = useMutation(api.tasksFunctions.updateTask);

  const handleTaskCheck = (taskId: Id<"tasks">, completed: boolean) => {
    console.log('handleTaskCheck called, taskId:', taskId, 'completed:', completed);
    updateTask({ taskId, patch: {completed} });
  };

  const handleOpenContextMenu = (event: React.MouseEvent, taskId: Id<'tasks'>) => {
    event.preventDefault();
    const { pageX, pageY } = event;
    setContextMenu({ isOpen: true, taskId, position: { x: pageX, y: pageY } });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isOpen: false, taskId: null, position: { x: 0, y: 0 } });
  };

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (contextMenu.isOpen && e.target instanceof Element && !e.target.closest('.context-menu')) {
      handleCloseContextMenu();
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [contextMenu.isOpen]);

  return (
    <>
      <ul className="">
        {data
          ? data.map((task) => (
              <li key={task._id} className={checkCard()}>
                <div className={checkCardContent()}>
                  <span className={checkmarkContainer()} onClick={() => handleTaskCheck(task._id, !task.completed)}>
                    {task.completed ? (
                      <CheckmarkIcon className={checkmarkIcon({className: 'text-green-500 opacity-30 hover:opacity-100'})}/>
                    ) : (
                      <EmptyCheckmarkIcon className={checkmarkIcon({className: "text-transparent hover:text-gray-200"})} />
                    )}
                  </span>
                  <div className={checkCardBody({className:`${task.completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${data.length > 1 ? "!border-gray-200" : ""}`})}>
                    {task.body}
                  </div>
                </div>
                <div className="w-[10px]">
                  <button className={`cursor-pointer hidden group-hover:block`} onClick={(e) => handleOpenContextMenu(e, task._id)}>
                    <MoreIcon className="w-full h-full fill-icons opacity-70" />
                  </button>
                </div>
              </li>
            ))
          : "Loading..."}
      </ul>
      {contextMenu.isOpen && (
        <ContextMenu
          taskId={contextMenu.taskId}
          onClose={handleCloseContextMenu}
          position={contextMenu.position}
        />
      )}
    </>
  );
}
