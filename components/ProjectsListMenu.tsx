"use client";

import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import PlusIcon from "@/public/plus-icon.svg";
import { icons } from "@/app/iconsLibrary";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CreateGroupMenu from "./CreateGroupMenu";
import { Id } from "@/convex/_generated/dataModel";
import GroupsContextMenu from "./menu-components/GroupsContextMenu";
import BasicGroups from './BasicGroups';
import BasicFooterGroups from "./BasicFooterGroups";
import { useParams } from "next/navigation";

const projectsListMenu = cva(
  "projectsListMenu w-[320px] bg-gradient-to-b from-[#e0e2f8] to-[#f4ecf9] p-3 select-none",
);

const groupContainer = cva("groupsContainer mb-4");
const groupToggler = cva(
  "groupsToggler group flex justify-between items-center text-xs cursor-pointer text-black/30 font-bold hover:bg-[#796bb3]/10 px-2.5 py-1.5 rounded-md",
);
const groupAddButton = cva(
  "groupAddButton aspect-square flex items-center justify-center max-h-2.5 h-full w-auto group rounded-sm cursor-pointer",
);
const groupAddButtonIcon = cva(
  "groupAddButtonIcon w-full h-full fill-transparent group-hover:fill-icons/50 hover:fill-gray-700 text-icons",
);
const groupList = cva("groupList flex flex-col");
const groupHint = cva(
  "groupHint text-xs py-2 px-3 bg-icons/10 text-icons/80 rounded-md",
);

export default function ProjectsListMenu(sidebarIsOpen: {
  sidebarIsOpen: boolean;
}) {
  const params = useParams<{ group: string }>();
  const [activeGroup, setActiveGroup] = useState(params.group ?? "all");
  const [openCustomList, setOpenCustomList] = useState(true);
  const [openFilteredList, setOpenFilteredList] = useState(true);
  const [openTaggedList, setOpenTaggedList] = useState(true);
  const [openCreateGroupMenu, setOpenCreateGroupMenu] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    groupId: Id<"taskGroups"> | string | null;
    position: { x: number; y: number };
  }>({ isOpen: false, groupId: null, position: { x: 0, y: 0 } });
  const [editingGroupId, setEditingGroupId] = useState<Id<"taskGroups"> | null>(null);

  useEffect(() => {
    if (params.group) {
      setActiveGroup(params.group);
    }
  }, [params.group]);

  const userFilters = [];
  const userTags = [];

  const userGroups = useQuery(api.groupsFunctions.getCustomGroups);

  const handleOpenContextMenu = (
    event: React.MouseEvent,
    groupId: Id<"taskGroups"> | string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(groupId, typeof groupId);
    const { pageX, pageY } = event;
    setContextMenu({ isOpen: true, groupId, position: { x: pageX, y: pageY } });
  };

    const handleCloseContextMenu = () => {
      setContextMenu({ isOpen: false, groupId: null, position: { x: 0, y: 0 } });
    };
  
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          contextMenu.isOpen &&
          e.target instanceof Element &&
          !e.target.closest(".contextMenu")
        ) {
          handleCloseContextMenu();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [contextMenu.isOpen]);


    




  // const userActiveBasicGroups = ['all', 'today', 'inbox'];

  const handleAddGroup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenCreateGroupMenu(true);
  };

  return (
    <section
      className={projectsListMenu()}
      hidden={!sidebarIsOpen.sidebarIsOpen}
    >
      <BasicGroups activeGroup={activeGroup} setActiveGroup={setActiveGroup} handleOpenContextMenu={handleOpenContextMenu} />

      <figure className="w-full h-[1px] bg-gray-300 mb-4"></figure>

      <div className={groupContainer()}>
        <div
          className={groupToggler()}
          onClick={() => setOpenCustomList(!openCustomList)}
        >
          Список
          <button
            className={groupAddButton()}
            onClick={(e) => handleAddGroup(e)}
          >
            <PlusIcon className={groupAddButtonIcon()} />
          </button>
        </div>

        {userGroups && userGroups.length > 0 ? (
          <ul className={groupList()} hidden={!openCustomList}>
            {userGroups.map((group) => (
              <GroupCard
                key={group._id}
                id={group._id}
                label={group.name}
                count={1}
                icon={icons[group.icon]}
                activeGroup={activeGroup}
                onSelect={setActiveGroup}
                handleOpenContextMenu={handleOpenContextMenu}
              />
            ))}
          </ul>
        ) : (
          <div className={groupHint()} hidden={!openCustomList}>
            Создайте свои списки задач
          </div>
        )}
      </div>

      <div className={groupContainer()}>
        <div
          className={groupToggler()}
          onClick={() => setOpenFilteredList(!openFilteredList)}
        >
          Фильтры
          <button
            className={groupAddButton()}
            onClick={(e) => handleAddGroup(e)}
          >
            <PlusIcon className={groupAddButtonIcon()} />
          </button>
        </div>

        {userFilters.length > 0 ? (
          <ul className={groupList()} hidden={!openFilteredList}>
            <GroupCard
              id="custom1"
              label="Кастомная 1"
              count={1}
              icon={icons["inbox"]}
              activeGroup={activeGroup}
              onSelect={setActiveGroup}
              handleOpenContextMenu={handleOpenContextMenu}
            />
          </ul>
        ) : (
          <div className={groupHint()} hidden={!openFilteredList}>
            Отображение задач, отфильтрованных по списку, дате, приоритету,
            метке и другим параметрам.
          </div>
        )}
      </div>

      <div className={groupContainer()}>
        <div
          className={groupToggler()}
          onClick={() => setOpenTaggedList(!openTaggedList)}
        >
          Метки
          <button
            className={groupAddButton()}
            onClick={(e) => handleAddGroup(e)}
          >
            <PlusIcon className={groupAddButtonIcon()} />
          </button>
        </div>

        {userTags.length > 0 ? (
          <ul className={groupList()} hidden={!openTaggedList}>
            <GroupCard
              id="custom1"
              label="Кастомная 1"
              count={1}
              icon={icons["inbox"]}
              activeGroup={activeGroup}
              onSelect={setActiveGroup}
              handleOpenContextMenu={handleOpenContextMenu}
            />
          </ul>
        ) : (
          <div className={groupHint()} hidden={!openTaggedList}>
            Категоризуйте свои задачи с помощью меток. Быстро выберите метку,
            введя &quot;#&quot; при добавлении задачи.
          </div>
        )}
      </div>

      <figure className="w-full h-[1px] bg-gray-300"></figure>

      <BasicFooterGroups activeGroup={activeGroup} setActiveGroup={setActiveGroup} handleOpenContextMenu={handleOpenContextMenu} />

      {openCreateGroupMenu && (
        <CreateGroupMenu setOpenCreateGroupMenu={setOpenCreateGroupMenu} setEditingGroupId={setEditingGroupId} editingGroupId={editingGroupId}/>
      )}

      {contextMenu.isOpen && <GroupsContextMenu groupId={contextMenu.groupId} onClose={handleCloseContextMenu} position={contextMenu.position} setEditingGroupId={setEditingGroupId} setOpenCreateGroupMenu={setOpenCreateGroupMenu}/>}
    </section>
  );
}
