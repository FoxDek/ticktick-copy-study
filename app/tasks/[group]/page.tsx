"use client";

import { useMutation, useQuery } from "convex/react"; // useConvexAuth
// import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import SidebarCloseIcon from "@/public/sidebar-close-icon.svg";
import SidebarOpenIcon from "@/public/sidebar-open-icon.svg";
import { useState } from "react";
import { useSidebar } from "@/components/SidebarProvider";
import { cva } from "class-variance-authority";
import TasksList from "@/components/TasksList";
import { Id } from "@/convex/_generated/dataModel";
import TaskFullView from "@/components/TaskFullView";
import { useActiveTask } from "@/components/ActiveTaskProvider";
import { useParams } from "next/navigation";
import { baseGroups } from "@/app/utils/baseGroups";
import EditableGroupTitle from '../../../components/EditableGroupTitle';

const tasks = cva("tasks flex flex-col gap-6 border-r border-gray-200 w-full h-full")
const tasksTop = cva("tasksTop flex items-center px-6 pt-6 min-h-[52px]")
const toggleSidebarButton = cva("toggleSidebarButton flex items-center justify-center w-7 group p-1.5 hover:bg-gray-100 rounded-sm cursor-pointer duration-100 ease-in-out")
const toggleSidebarButtonIcon = cva('toggleSidebarButtonIcon w-full h-full duration-100 ease-in-out fill-icons')
const tasksTopTitle = cva("tasksTopTitle text-xl font-semibold select-none ml-1.5")
const tasksInput = cva("w-full bg-gray-100 py-2 px-4 rounded-md placeholder:text-sm placeholder:opacity-50 outline-transparent outline-1 focus:bg-white focus:outline-[#a596e0]")



export default function Tasks() {
  const {sidebarIsOpen, setSidebarIsOpen} = useSidebar();
  const Icon = sidebarIsOpen ? SidebarCloseIcon : SidebarOpenIcon;
  const [inputValue, setInputValue] = useState("");
  const {activeTaskId} = useActiveTask();
  const addTask = useMutation(api.tasksFunctions.addTask);
  const activeTask = useQuery(api.tasksFunctions.getTask, activeTaskId ? { taskId: activeTaskId as Id<"tasks"> } : "skip");
  const subtasks = useQuery(api.subtasksFunctions.getSubtasks, activeTaskId ? { taskId: activeTaskId as Id<"tasks"> } : "skip")

  const activeGroup = useParams<{ group: string }>().group;

  const handleAddTask = () => {
    if (activeGroup === 'all' || activeGroup === 'inbox') {
      addTask({ body: inputValue });
    } else if (activeGroup === 'today') {
      addTask({ body: inputValue, dueDate: new Date().toISOString().split('T')[0]});
    } else {
      addTask({ body: inputValue, groupId: activeGroup as Id<"taskGroups"> });
    }
    setInputValue("");
  };




  const customGroup = useQuery(
    api.groupsFunctions.getCustomGroup,
    activeGroup && !baseGroups[activeGroup as keyof typeof baseGroups] ? { groupId: activeGroup as Id<"taskGroups"> } : "skip"
  )
  const groupTitle = baseGroups[activeGroup as keyof typeof baseGroups];

  return (
    <div className="flex h-full">

      <section className={tasks()}>
        <div className={tasksTop()}>
          <button className={toggleSidebarButton()} onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
            <Icon className={toggleSidebarButtonIcon()} />
          </button>
          {groupTitle && <h2 className={tasksTopTitle()}>{groupTitle}</h2>}
          {customGroup && <EditableGroupTitle customGroupId={customGroup._id} body={customGroup.name}/>}
        </div>
        {activeGroup !== 'completed' && activeGroup !== 'deleted' && <div className="px-6">
          <input type="text" className={tasksInput()} placeholder="+ Добавить задачу" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddTask()}/>
        </div>}
        
        <TasksList activeGroup={activeGroup}/>
      </section>

      {/* <div className="ТУТ БУДЕТ БЛОК ДЛЯ РЕСАЙЗА"></div>*/}

      <section className="w-full h-full flex flex-col max-w-[450px]">
        {activeTaskId && <TaskFullView taskData={activeTask} subtasks={subtasks} />  }
      </section>

    </div>
  );
}





