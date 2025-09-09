"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import TasksContextMenu from "./menu-components/TasksContextMenu";
import TaskCard from "./TaskCard";
import Loader from "./Loader";
import { useTaskActions } from "@/app/hoocs/useTaskActions";
import EmptyTasksList from "./EmptyTasksList";

export default function TasksList({ activeGroup }: { activeGroup: string }) {
  const data = useQuery(api.tasksFunctions.getTasks, { groupId: activeGroup });
  const { handleTaskCheck } = useTaskActions();

  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    taskId: Id<"tasks"> | null;
    position: { x: number; y: number };
  }>({ isOpen: false, taskId: null, position: { x: 0, y: 0 } });

  const handleOpenContextMenu = (
    event: React.MouseEvent,
    taskId: Id<"tasks">,
  ) => {
    event.preventDefault();
    const { pageX, pageY } = event;
    setContextMenu({ isOpen: true, taskId, position: { x: pageX, y: pageY } });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isOpen: false, taskId: null, position: { x: 0, y: 0 } });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenu.isOpen &&
        e.target instanceof Element &&
        !e.target.closest(".context-menu")
      ) {
        handleCloseContextMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [contextMenu.isOpen]);

  return (
    <div className="pl-6 pr-2 h-full">
      <ul className="h-full">
        {data ? (
          data.length > 0 ? (
            data.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                hasMultipleTasks={data.length > 1}
                handleTaskCheck={handleTaskCheck}
                handleOpenContextMenu={handleOpenContextMenu}
                activeGroup={activeGroup}
              />
            ))
          ) : (
            <EmptyTasksList activeGroup={activeGroup} />
          )
        ) : (
          <div className="h-full w-full items-center justify-center">
            <Loader spinnerColor={"text-[#a596e0]"} />
          </div>
        )}
      </ul>
      {contextMenu.isOpen && (
        <TasksContextMenu
          taskId={contextMenu.taskId}
          onCloseContextMenu={handleCloseContextMenu}
          position={contextMenu.position}
        />
      )}
    </div>
  );
}
