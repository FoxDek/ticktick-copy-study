import { cva } from "class-variance-authority"
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import MoreIcon from "@/public/more-icon.svg";
import { Id } from "@/convex/_generated/dataModel";

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

interface TaskCardProps {
  task: {
    _id: Id<"tasks">;
    body: string;
    completed: boolean;
  };
  hasMultipleTasks?: boolean;
  handleTaskCheck: (taskId: Id<"tasks">, completed: boolean) => void;
  handleOpenContextMenu: (event: React.MouseEvent, taskId: Id<"tasks">) => void;
  isActive?: boolean,
  setActiveTaskId: (taskId: Id<"tasks"> | null) => void
}

export default function TaskCard({ task, hasMultipleTasks, handleTaskCheck, handleOpenContextMenu, isActive, setActiveTaskId }: TaskCardProps) {
  return (
    <li key={task._id} className={checkCard()} onClick={() => setActiveTaskId(task._id)}>
      <div className={checkCardContent( { active: isActive })}>
        <span
          className={checkmarkContainer()}
          onClick={() => handleTaskCheck(task._id, !task.completed)}
        >
          {task.completed ? (
            <CheckmarkIcon
              className={checkmarkIcon({
                className: "text-green-500 opacity-30 hover:opacity-100",
              })}
            />
          ) : (
            <EmptyCheckmarkIcon
              className={checkmarkIcon({
                className: "text-transparent hover:text-gray-200",
              })}
            />
          )}
        </span>
        <div
          className={checkCardBody({
            className: `${task.completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${hasMultipleTasks ? "!border-gray-200" : ""}`,
          })}
        >
          {task.body}
        </div>
      </div>
      <div className="w-[10px]">
        <button
          className={`cursor-pointer hidden group-hover:block`}
          onClick={(e) => handleOpenContextMenu(e, task._id)}
        >
          <MoreIcon className="w-full h-full fill-icons opacity-70" />
        </button>
      </div>
    </li>
  );
}
