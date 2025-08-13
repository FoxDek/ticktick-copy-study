import { cva } from "class-variance-authority";
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import { Id } from "@/convex/_generated/dataModel";
import EditableSubtaskBody from "./EditableSubtaskBody";
import { useSubtasksActions } from "@/app/hoocs/useSubtasksActions";

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
  const {handleSubtaskCheck, handleSubtaskDelete} = useSubtasksActions();


  return (
    <ul>
      {subtasks?.map((subtask) => (
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

            <EditableSubtaskBody body={subtask.body} subtaskId={subtask._id} completed={subtask.completed} listDescToggler={listDescToggler}/>

            {/* <div
              className={`text-sm ${listDescToggler === "list" ? "text-red-400" : "text-green-400"}`}
            >
              {subtask.body}
            </div> */}

            {listDescToggler === "list" && (
              <div className="aspect-square flex items-center justify-center max-h-3.5 h-full group opacity-0 group-hover:opacity-100 w-auto rounded-sm cursor-pointer duration-100 ease-in-out" onClick={() => { handleSubtaskDelete(subtask._id, taskId, subtaskCount) }}>
                <TrashIcon className={iconSvg({className: "group-hover:fill-gray-900 duration-100 ease-in-out"})} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
