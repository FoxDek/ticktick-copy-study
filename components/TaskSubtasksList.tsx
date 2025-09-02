import { cva } from "class-variance-authority";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import { Id } from "@/convex/_generated/dataModel";
import EditableSubtaskBody from "./EditableSubtaskBody";
import { useSubtasksActions } from "@/app/hoocs/useSubtasksActions";
import { useEffect, useState } from "react";

interface Subtask {
  _id: Id<"subtasks">;
  body: string;
  completed: boolean;
}

// Интерфейс для пропсов компонента
interface SubtasksProps {
  subtasks: Subtask[];
  listDescToggler: string;
  taskId: Id<"tasks">;
  subtaskCount: number;
}

const checkmarkContainer = cva("checkmarkContainer flex items-center justify-center h-4 group cursor-pointer mr-3");
const checkmarkIcon = cva('checkmarkIcon w-full h-full duration-100 ease-in-out');
const iconSvg = cva('iconSvg w-full h-full fill-icons');


export default function TaskSubtasksList({subtasks, listDescToggler, taskId, subtaskCount}: SubtasksProps)  {
  const {handleSubtaskCheck, handleSubtaskDelete, handleSubtaskCreate} = useSubtasksActions();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAddSubtask = async () => {
    await handleSubtaskCreate(taskId, subtaskCount);
    setActiveIndex(subtaskCount);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (activeIndex === null) return;

    if(e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIndex < subtasks.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, subtaskCount]);

  const handleBackspaceDelete = (subtaskId: Id<"subtasks">) => {
    handleSubtaskDelete(subtaskId, taskId, subtaskCount);
    setActiveIndex(activeIndex && activeIndex > 0 ? activeIndex - 1 : null);
  }


  return (
    <ul>
      {/* <div>{activeIndex}</div> */}
      {subtasks?.map((subtask, index) => (
        <li key={subtask._id} className="flex items-center justify-between group">
          {listDescToggler === "list" && (
            <span className={checkmarkContainer()} onClick={() => handleSubtaskCheck(subtask._id, !subtask.completed)}>
              {subtask.completed ? (
                <CheckmarkIcon
                  className={checkmarkIcon({
                    className: "fill-icons opacity-30 hover:opacity-100",
                  })}
                />
              ) : (
                <EmptyCheckmarkIcon
                  className={checkmarkIcon({
                    className: `text-transparent fill-icons hover:text-gray-200`,
                  })}
                />
              )}
            </span>
          )}
          <div className={`flex justify-between w-full items-center ${listDescToggler === "list" && 'border-b py-1.5 border-gray-200'}`}>

            <EditableSubtaskBody autoEditId={activeIndex === index} onFocusChange={() => setActiveIndex(index)} body={subtask.body} subtaskId={subtask._id} completed={subtask.completed} listDescToggler={listDescToggler} handleAddSubtask={handleAddSubtask} subtaskCount={subtaskCount} handleBackspaceDelete={handleBackspaceDelete}/>

            {listDescToggler === "list" && (
              <div className="aspect-square flex items-center justify-center max-h-3.5 h-full group opacity-0 group-hover:opacity-100 w-auto rounded-sm cursor-pointer duration-100 ease-in-out" onClick={() => { handleSubtaskDelete(subtask._id, taskId, subtaskCount) }}>
                <TrashIcon className={iconSvg({className: "hover:fill-gray-900 duration-100 ease-in-out"})} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
