"use client";
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useActiveTask } from "../ActiveTaskProvider";
import { useGroupsActions } from "@/app/hoocs/useGroupsActions";

const contextMenu = cva(
  "context-menu absolute bg-white shadow-lg rounded-md p-2 z-10 w-[150px]",
);
const contextMenuItem = cva(
  "cursor-pointer hover:bg-gray-100 px-2.5 py-1.5 rounded-md text-sm whitespace-nowrap",
);

const basicGroups = ['all', 'today', 'inbox', 'deleted', 'completed'];

export default function GroupsContextMenu({
  groupId,
  onClose,
  position,
  setEditingGroupId,
  setOpenCreateGroupMenu,
}: {
  groupId: Id<"taskGroups"> | string | null;
  onClose: () => void;
  position: { x: number; y: number };
  setEditingGroupId: (groupId: Id<"taskGroups"> | null) => void;
  setOpenCreateGroupMenu: (value: boolean) => void;
}) {
  const {handleDeleteCustomGroup} = useGroupsActions();
  const { setActiveTaskId } = useActiveTask();

  const handleDeleteGroup = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события до handleClickOutside
    if (!groupId) {
      console.error("groupId is null or undefined");
      return;
    }
    console.log(typeof groupId);

    handleDeleteCustomGroup({ groupId: groupId as Id<"taskGroups"> })
      .then(() => {
        console.log("Task deleted successfully");
        onClose();
        setActiveTaskId(null);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  if (!groupId) {
    console.log("ContextMenu not rendered: groupId is null");
    return null;
  }
  const adjustedX = Math.min(
    Math.max(position.x, 0),
    window.innerWidth - 200,
  );


  const handleOpenMenuWithEditing = () => {
    setOpenCreateGroupMenu(true);
    setEditingGroupId(groupId as Id<"taskGroups">);
    onClose();
  };

  return (
    <div className={contextMenu()} style={{ top: position.y, left: adjustedX }}>
      <ul>
        <li className={contextMenuItem()} onClick={() => handleOpenMenuWithEditing()}>Редактировать</li>
        {!basicGroups.includes(groupId) && <div>
          <li className={contextMenuItem()}>Закрепить</li>
          <li className={contextMenuItem()}>Дублировать</li>
          <li className={contextMenuItem()}>Поделиться</li>
          <li className={contextMenuItem()}>В архив</li>
          <li className={contextMenuItem()} onClick={(e) => handleDeleteGroup(e)}>Удалить</li>
        </div>}
        {basicGroups.includes(groupId) && <div>
          <li className={contextMenuItem()}>Дублировать</li>
          <li className={contextMenuItem()}>Поделиться</li>
        </div>}
      </ul>
    </div>
  );
}
