"use client";
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useActiveTask } from "../ActiveTaskProvider";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TasksContextPriorityMenu from './TasksContextPriorityMenu';
import { useTaskActions } from "@/app/hoocs/useTaskActions";
import TasksContextGroupMenu from './TasksContextGroupMenu';
import { useRef, useState } from "react";

const contextMenu = cva(
  "context-menu absolute bg-white shadow-lg rounded-md p-2 z-10 w-[200px]",
);
const contextMenuItem = cva(
  "cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap",
);

export default function TasksContextMenu({
  taskId,
  onCloseContextMenu,
  position,
}: {
  taskId: Id<"tasks"> | null;
  onCloseContextMenu: () => void;
  position: { x: number; y: number };
}) {
  const deleteTask = useMutation(api.tasksFunctions.deleteTask);
  const { setActiveTaskId } = useActiveTask();
  const taskData = useQuery(api.tasksFunctions.getTask, taskId ? { taskId } : "skip");
  const {handleDuplicateTask} = useTaskActions();
  const [groupContextMenuIsOpen, setGroupContextMenuIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setGroupContextMenuIsOpen(false);
    }, 300);
  }

  const handleMouseEnter = () => {
    setGroupContextMenuIsOpen(true);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  }

  const onDuplicateTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!taskData) return;
    handleDuplicateTask({body: taskData?.body, groupId: taskData?.groupId});
  }

  const onDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события до handleClickOutside
    if (!taskId) {
      console.error("taskId is null or undefined");
      return;
    }

    deleteTask({ taskId })
      .then(() => {
        console.log("Task deleted successfully");
        onCloseContextMenu();
        setActiveTaskId(null);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  if (!taskId) {
    console.log("ContextMenu not rendered: taskId is null");
    return null;
  }
  const adjustedX = Math.min(
    Math.max(position.x - 200 / 2, 0),
    window.innerWidth - 200,
  );

  return (
    <div className={contextMenu()} style={{ top: position.y, left: adjustedX }}>
      <ul>
        <TasksContextPriorityMenu priority={taskData?.priority} taskId={taskId} />

        <li className={contextMenuItem()}>Создать родительскую...</li>
        <li className={contextMenuItem()}>Закрепить</li>
        <li className={contextMenuItem()}>Не буду делать</li>
        <li className={contextMenuItem({className: "relative group"})} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
          <span>Переместить в...</span>
          {taskData && groupContextMenuIsOpen && <div onMouseEnter={() => handleMouseEnter()}>
            <TasksContextGroupMenu onCloseContextMenu={onCloseContextMenu} taskId={taskId} groupId={taskData?.groupId as Id<"taskGroups">} groupContextMenuIsOpen={groupContextMenuIsOpen}/>
          </div>}
        </li>
        <li className={contextMenuItem()}>Метки</li>
        <li className={contextMenuItem()} onClick={(e) => onDuplicateTask(e)}>Дублировать</li>
        <li className={contextMenuItem()}>Копировать ссылку</li>
        <li className={contextMenuItem()}>Преобразовать в зам...</li>
        <li className={contextMenuItem()} onClick={(e) => onDeleteTask(e)}>
          Удалить
        </li>
      </ul>

    </div>
  );
}
