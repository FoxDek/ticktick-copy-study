'use client';
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useActiveTask } from "./ActiveTaskProvider";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const contextMenu = cva("context-menu absolute bg-white shadow-lg rounded-md p-2 z-10 w-[200px]")
const contextMenuItem = cva('cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap')

export default function ContextMenu({ taskId, onClose, position }: { taskId: Id<'tasks'> | null ; onClose: () => void; position: { x: number; y: number } }) {
  const deleteTask = useMutation(api.tasksFunctions.deleteTask);
  const {setActiveTaskId} = useActiveTask();

  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события до handleClickOutside
    if (!taskId) {
      console.error('taskId is null or undefined');
      return;
    }
    
    deleteTask({taskId})
      .then(() => {
        console.log('Task deleted successfully');
        onClose();
        setActiveTaskId(null);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  if (!taskId) {
    console.log('ContextMenu not rendered: taskId is null');
    return null;
  }
  const adjustedX = Math.min(Math.max(position.x - 200 / 2, 0), window.innerWidth - 200);
  

  return (
    <div
      className={contextMenu()}
      style={{ top: position.y, left: adjustedX }}
    >
      <ul>
        <li className={contextMenuItem()}>Создать родительскую...</li>
        <li className={contextMenuItem()}>Закрепить</li>
        <li className={contextMenuItem()}>Не буду делать</li>
        <li className={contextMenuItem()}>Переместить в...</li>
        <li className={contextMenuItem()}>Метки</li>
        <li className={contextMenuItem()}>Дублировать</li>
        <li className={contextMenuItem()}>Копировать ссылку</li>
        <li className={contextMenuItem()}>Преобразовать в зам...</li>
        <li className={contextMenuItem()} onClick={(e) => handleDeleteTask(e)}>Удалить</li>
      </ul>
    </div>
  );
};