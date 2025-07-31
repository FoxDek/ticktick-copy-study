"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import SidebarCloseIcon from "@/public/sidebar-close-icon.svg";
import SidebarOpenIcon from "@/public/sidebar-open-icon.svg";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import MoreIcon from "@/public/more-icon.svg";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/SidebarProvider";
import { cva } from "class-variance-authority";
import ContextMenu from "@/components/ContextMenu";
import { updateTask } from '../../convex/tasksFunctions';

const tasks = cva("tasks p-6 flex flex-col gap-6 border-r border-gray-200 max-w-[780px] w-full h-full")
const tasksTop = cva("tasksTop flex gap-2 items-center")
const toggleSidebarButton = cva("toggleSidebarButton flex items-center justify-center w-7 group p-1.5 hover:bg-gray-100 rounded-md cursor-pointer")
const toggleSidebarButtonIcon = cva('toggleSidebarButtonIcon w-full h-full duration-100 ease-in-out fill-icons')
const tasksTopTitle = cva("tasksTopTitle text-lg font-bold")
const tasksInput = cva("w-full bg-gray-100 py-2 px-4 rounded-md placeholder:text-sm placeholder:opacity-50 outline-transparent outline-1 focus:bg-white focus:outline-[#a596e0]")



export default function Tasks() {
  const {sidebarIsOpen, setSidebarIsOpen} = useSidebar();
  const Icon = sidebarIsOpen ? SidebarCloseIcon : SidebarOpenIcon;
  const [inputValue, setInputValue] = useState("");
  const addTask = useMutation(api.tasksFunctions.addTask);

  const handleAddTask = () => {
    addTask({ body: inputValue });
    setInputValue("");
  };

  return (
    <div className={tasks()}>

      <div className={tasksTop()}>
        <button className={toggleSidebarButton()} onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
          <Icon className={toggleSidebarButtonIcon()} />
        </button>
        <h2 className={tasksTopTitle()}>Все</h2>
      </div>

      <input type="text" className={tasksInput()} placeholder="+ Добавить задачу" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTask()}/>
      <TasksComponent />
    </div>
  );
}

const checkmarkContainer = cva("flex items-center justify-center w-4 group cursor-pointer")
const checkCard = cva('flex items-center gap-2 group')
const checkCardContent = cva("w-full flex flex-row items-center gap-2 group-hover:bg-gray-100 rounded-md text-sm px-4 duration-100 ease-in-out", {
  variants: {
    active: {
      true: "bg-[#c1b6ec2c]",
      false: "bg-transparent",
    }
  }
})

function TasksComponent() {
  const data = useQuery(api.tasksFunctions.getTasks);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    taskId: string | null;
    position: { x: number; y: number };
  }>({ isOpen: false, taskId: null, position: { x: 0, y: 0 } });

  const updateTask = useMutation(api.tasksFunctions.updateTask);

  const handleTaskCheck = (taskId: string, completed: boolean) => {
    console.log('handleTaskCheck called, taskId:', taskId, 'completed:', completed);
    updateTask({ taskId, completed });
  };

  const handleOpenContextMenu = (event: React.MouseEvent, taskId: string) => {
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
                      <CheckmarkIcon className="w-full h-full fill-icons text-green-500 opacity-30 hover:opacity-100" />
                    ) : (
                      <EmptyCheckmarkIcon className="w-full h-full fill-icons text-transparent hover:text-gray-200" />
                    )}
                  </span>
                  <div className={`h-full w-full py-2 duration-100 ease-in-out ${task.completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${data.length > 1 ? "border-b border-gray-200" : ""}`}>
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

