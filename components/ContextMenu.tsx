'use client';
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export default function ContextMenu({ taskId, onClose, position }: { taskId: string | null ; onClose: () => void; position: { x: number; y: number } }) {
  const deleteTask = useMutation(api.tasksFunctions.deleteTask);

  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события до handleClickOutside
    console.log('handleDeleteTask called, taskId:', taskId);
    if (!taskId) {
      console.error('taskId is null or undefined');
      return;
    }
    console.log('Calling deleteTask with taskId:', taskId);
    deleteTask({ taskId })
      .then(() => {
        console.log('Task deleted successfully');
        onClose();
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
      className="context-menu absolute bg-white shadow-lg rounded-md p-2 z-10 w-[200px]"
      style={{ top: position.y, left: adjustedX }}
    >
      <ul>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Создать родительскую...</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Закрепить</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Не буду делать</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Переместить в...</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Метки</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Дублировать</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap">Копировать ссылку</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap" onClick={() => console.log('aboba')}>Преобразовать в зам...</li>
        <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md text-sm whitespace-nowrap" onClick={(e) => handleDeleteTask(e)}>Удалить</li>
      </ul>
    </div>
  );
};