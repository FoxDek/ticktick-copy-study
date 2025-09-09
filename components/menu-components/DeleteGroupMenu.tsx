'use client';
import { useGroupsActions } from "@/app/hoocs/useGroupsActions";
import { Id } from "@/convex/_generated/dataModel";
import { useActiveTask } from "../ActiveTaskProvider";
import CrossIcon from '@/public/cross-icon.svg'
import EmptyCheckmarkIcon from "@/public/fillcheck.svg";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import { cva } from "class-variance-authority";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

interface DeleteGroupMenuProps {
  editingGroupId: Id<"taskGroups"> | null
  setOpenDeleteGroupWindow: (value: boolean) => void
  onCloseContextMenu: () => void
  setEditingGroupId: (groupId: Id<"taskGroups"> | null) => void
}

const contextMenu = cva("contextMenu absolute flex top-1/2 left-1/2 w-full max-w-sm transform -translate-x-1/2 -translate-y-1/2 z-20")
const contextMenuSubstrate = cva("contextMenuSubstrate flex flex-col gap-3 w-full max-w-sm bg-white shadow-lg/20 border border-gray-200 rounded-lg p-5 text-sm")
const deleteGroupButtons = cva("createGroupButtons flex w-full gap-2 justify-end items-center mt-5")
const deleteGroupButton = cva("createGroupButton px-4.5 py-1 text-sm rounded-md cursor-pointer duration-200 ease-in-out")
const checkmarkContainer = cva("flex items-center justify-start h-4 group cursor-pointer")
const checkmarkIcon = cva('w-auto h-full duration-100 ease-in-out fill-icons text-transparent hover:text-gray-200')





export default function DeleteGroupMenu({editingGroupId, setOpenDeleteGroupWindow, onCloseContextMenu, setEditingGroupId}: DeleteGroupMenuProps) {
    const {handleDeleteCustomGroup} = useGroupsActions();
    const { setActiveTaskId } = useActiveTask();
    const [alsoDeleteTasks, setAlsoDeleteTasks] = useState(false);
    const groupData = useQuery(api.groupsFunctions.getCustomGroup, editingGroupId ? { groupId: editingGroupId } : "skip");
  
    const onDeleteGroup = () => {
      if (!editingGroupId) {
        console.error("groupId is null or undefined");
        return;
      }
  
      handleDeleteCustomGroup({ groupId: editingGroupId as Id<"taskGroups">, alsoDeleteTasks })
        .catch((error) => {
          console.error("Error deleting task:", error);
        })
        .finally(() => {
          console.log("Task deleted successfully");
          onCloseContextMenu();
          setEditingGroupId(null);
          setAlsoDeleteTasks(false);
          setOpenDeleteGroupWindow(false);
          setActiveTaskId(null);
        });
    };

    const handleCloseCreateGroupMenu = () => {
      setOpenDeleteGroupWindow(false);
    }

  return (
    <section className={contextMenu()}>
      <div className={contextMenuSubstrate()}>
        <p>Удалить список &quot;{groupData?.name}&quot;?</p>
        <div className="flex gap-2 items-center">
          <span
            className={checkmarkContainer()}
            onClick={() => setAlsoDeleteTasks(!alsoDeleteTasks)}
          >
            {alsoDeleteTasks ? (
              <CheckmarkIcon
                className={checkmarkIcon()}
              />
            ) : <EmptyCheckmarkIcon
                className={checkmarkIcon()}
              />}
          </span>
          <p>Также удалить все задачи</p>
        </div>
        <div className={deleteGroupButtons()}>
          <button className={deleteGroupButton( {className: 'border border-gray-200 text-gray-500 hover:bg-gray-100'})} onClick={() => handleCloseCreateGroupMenu()}>Отмена</button>
          <button className={deleteGroupButton({className: `bg-[#9582e0] text-white hover:opacity-80`})}onClick={() => onDeleteGroup()}>Удалить</button>
        </div>
        
        <span className="absolute top-3 right-3 aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm cursor-pointer" onClick={() => handleCloseCreateGroupMenu()}>
          <CrossIcon className='iconSvg w-full h-full fill-icons text-icons' />
        </span>
      </div>
    </section>
  );
}