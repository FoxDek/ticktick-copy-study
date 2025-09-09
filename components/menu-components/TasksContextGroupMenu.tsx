'use client';
import { useTaskActions } from "@/app/hoocs/useTaskActions";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useQuery } from "convex/react";
import { useEffect } from "react";
import InboxIcon from '@/public/inbox-icon.svg'
import CheckIcon from "@/public/check-icon.svg";
import { icons } from '../../app/iconsLibrary';

interface FullTaskGroupMenuProps {
  onCloseContextMenu: (value: boolean) => void;
  taskId: Id<"tasks">;
  groupId: Id<"taskGroups"> | undefined;
  groupContextMenuIsOpen: boolean;
}

const contextMenu = cva("contextMenu absolute top-0 left-[108%] w-full h-fit bg-white shadow-lg rounded-md p-1 z-10 border border-gray-200 bottom-13 text-sm")
const contextMenuList = cva("flex flex-col")
const contextMenuListItem = cva("p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center rounded-sm", {
  variants: {
    active: {
      true: 'text-purple-400 ',
    }
}})
const contextMenuListItemContent = cva('contextMenuListItemContent flex items-center gap-2')
const iconContainer = cva('aspect-square flex items-center justify-center max-w-4 w-full h-auto rounded-sm')
const iconSvg = cva("w-full h-full duration-100 ease-in-out")

export default function TasksContextGroupMenu({onCloseContextMenu, taskId, groupId, groupContextMenuIsOpen}: FullTaskGroupMenuProps) {
  const groups = useQuery(api.groupsFunctions.getCustomGroups) || [];
  const {handleGroupChange} = useTaskActions()

  const handleGroupClick = (newGroupId: Id<"taskGroups"> | null) => {
    if (newGroupId !== groupId) {
      handleGroupChange(taskId, newGroupId)
    }
    onCloseContextMenu(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        groupContextMenuIsOpen &&
        e.target instanceof Element &&
        !e.target.closest(".contextMenu") &&
        !e.target.closest(".taskGroupToggler")
      ) {
        onCloseContextMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [groupContextMenuIsOpen, onCloseContextMenu]);

  

  return (
    <div className={contextMenu()}>
      <ul className={contextMenuList()}>
        <li className={contextMenuListItem({active: !groupId})} onClick={() => handleGroupClick(null)}>
          <div className={contextMenuListItemContent()}>
            <span className={iconContainer()}>
              <InboxIcon className={iconSvg({className: !groupId ? 'fill-purple-400' : 'fill-icons'})}/>
            </span>
            <span className="truncate max-w-3/4 w-full">Входящие</span>
          </div>
          {!groupId && <CheckIcon className='fill-purple-400 w-3 absolute right-3'/>}
        </li>
        {groups.map((group) => {

          const IconComponent = icons[group.icon];

          return (
          <li
            key={group._id}
            className={contextMenuListItem({active: group._id === groupId} )}
            onClick={() => {
              handleGroupClick(group._id);
            }}
          >
            <div className={contextMenuListItemContent()}>
              <span className={iconContainer()}>
                <IconComponent className={iconSvg({className: group._id === groupId ? 'fill-purple-400' : 'fill-icons'})}/>
              </span>
              <span className="truncate max-w-3/4 w-full">{group.name}</span>
            </div>
            {group._id === groupId && <CheckIcon className='fill-purple-400 w-3 absolute right-3'/>}
          </li>
          );
        })}
      </ul>
    </div>
  );
}