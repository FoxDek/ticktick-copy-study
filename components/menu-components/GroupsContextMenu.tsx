"use client";
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { baseGroups } from "@/app/utils/baseGroups";

const contextMenu = cva(
  "contextMenu absolute bg-white shadow-lg rounded-md p-2 z-10 w-fit",
);
const contextMenuItem = cva(
  "contextMenuItem cursor-pointer hover:bg-gray-100 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap",
);


export default function GroupsContextMenu({
  groupId,
  onCloseContextMenu,
  position,
  setEditingGroupId,
  setOpenCreateGroupMenu,
  setOpenDeleteGroupWindow,
}: {
  groupId: Id<"taskGroups"> | string | null;
  onCloseContextMenu: () => void;
  position: { x: number; y: number };
  setEditingGroupId: (groupId: Id<"taskGroups"> | null) => void;
  setOpenCreateGroupMenu: (value: boolean) => void;
  setOpenDeleteGroupWindow: (value: boolean) => void;
}) {


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
    onCloseContextMenu();
  };

  const handleOpenDeleteGroupWindow = () => {
    setOpenDeleteGroupWindow(true);
    setEditingGroupId(groupId as Id<"taskGroups">);
    onCloseContextMenu();
  }

  return (
    <div className={contextMenu()} style={{ top: position.y, left: adjustedX }}>
      <ul>
        <li className={contextMenuItem()} onClick={() => handleOpenMenuWithEditing()}>Редактировать</li>
        {!Object.keys(baseGroups).includes(groupId) && <div>
          <li className={contextMenuItem()}>Закрепить</li>
          <li className={contextMenuItem()}>Дублировать</li>
          <li className={contextMenuItem()}>Поделиться</li>
          <li className={contextMenuItem()}>В архив</li>
          <li className={contextMenuItem()} onClick={() => handleOpenDeleteGroupWindow()}>Удалить</li>
        </div>}
        {Object.keys(baseGroups).includes(groupId) && <div>
          <li className={contextMenuItem()}>Показывать, если не пусто</li>
          <li className={contextMenuItem()}>Скрыть</li>
        </div>}
      </ul>
    </div>
  );
}
