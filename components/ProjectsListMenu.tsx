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
import DeleteGroupMenu from "./menu-components/DeleteGroupMenu";
import { useTheme } from "./ThemeProvider";
import colorThemesStyles from "@/app/constants/themes-styles";
import { useSidebar } from "./SidebarProvider";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@/public/search-icon.svg";
import SyncIcon from "@/public/sync-icon.svg";
import NotifIcon from "@/public/notif-icon.svg";

const projectsListMenu = cva(
  "projectsListMenu w-3/4 xs:w-[320px] p-3 select-none h-full md:h-auto absolute top-0 xs:left-[50px] md:left-0 z-20 md:static",
);

const groupContainer = cva("groupsContainer mb-4");
const groupToggler = cva(
  "groupsToggler group flex justify-between items-center text-xs cursor-pointer font-bold hover:bg-[#796bb3]/10 px-2.5 py-1.5 rounded-md",
);
const groupAddButton = cva(
  "groupAddButton aspect-square flex items-center justify-center max-h-2.5 h-full w-auto group rounded-sm cursor-pointer",
);
const groupAddButtonIcon = cva(
  "groupAddButtonIcon w-full h-full fill-transparent group-hover:fill-icons/50 hover:fill-gray-700 text-icons",
);
const groupList = cva("groupList flex flex-col");
const groupHint = cva(
  "groupHint text-xs py-2 px-3 bg-icons/10 rounded-md",
);
const mobileAsideActionsiconContainer = cva("iconContainer flex items-center justify-center w-5 group");
const mobileAsideActionsiconSvg = cva("iconSvg w-full h-full duration-100 ease-in-out");


export default function ProjectsListMenu({ sidebarIsOpen, setIsUserContextMenuOpen }: {
  sidebarIsOpen: boolean;
  setIsUserContextMenuOpen: (value: boolean) => void;
}) {
  const params = useParams<{ group: string }>();
  const [activeGroup, setActiveGroup] = useState(params.group ?? "all");
  const [openCustomList, setOpenCustomList] = useState(true);
  const [openFilteredList, setOpenFilteredList] = useState(true);
  const [openTaggedList, setOpenTaggedList] = useState(true);
  const [openCreateGroupMenu, setOpenCreateGroupMenu] = useState(false);
  const [openDeleteGroupWindow, setOpenDeleteGroupWindow] = useState(false);
  const {setSidebarIsOpen} = useSidebar();
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    groupId: Id<"taskGroups"> | string | null;
    position: { x: number; y: number };
  }>({ isOpen: false, groupId: null, position: { x: 0, y: 0 } });
  const [editingGroupId, setEditingGroupId] = useState<Id<"taskGroups"> | null>(null);
  const { theme } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];

  useEffect(() => {
    if (params.group) {
      setActiveGroup(params.group);
    }
  }, [params.group]);

  useEffect(() => {
    if (window.matchMedia('(max-width: 48rem)').matches) {
      setSidebarIsOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeGroup]);

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

  const handleAddGroup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenCreateGroupMenu(true);
  };

  return (
    <section
      className={projectsListMenu({ className: `${themeStyles.projectsList}` })}
      hidden={!sidebarIsOpen}
    >
      <div className="mobileAsideActions flex items-center justify-between py-6 px-2 xs:hidden">
        <div className={'relative aspect-square w-8 overflow-hidden rounded-md cursor-pointer border border-gray-300'} onClick={() => setIsUserContextMenuOpen(true)}>
          <Image
            src={"/default-user-photo.png"}
            alt="User photo"
            fill
            className="object-cover"
          />
        </div>
        <div className={'flex gap-4'}>
          <Link href={"#"} className={mobileAsideActionsiconContainer()}>
            <SyncIcon className={mobileAsideActionsiconSvg({className: `${themeStyles.icons}`})} />
          </Link>
          <Link href={"#"} className={mobileAsideActionsiconContainer()}>
            <SearchIcon className={mobileAsideActionsiconSvg({className: `${themeStyles.icons}`})} />
          </Link>
          <Link href={"#"} className={mobileAsideActionsiconContainer()}>
            <NotifIcon className={mobileAsideActionsiconSvg({className: `${themeStyles.icons}`})} />
          </Link>
        </div>
      </div>
      
      <BasicGroups activeGroup={activeGroup} setActiveGroup={setActiveGroup} handleOpenContextMenu={handleOpenContextMenu} />

      <figure className="w-full h-[1px] bg-gray-300 mb-4"></figure>

      <div className={groupContainer()}>
        <div
          className={groupToggler({ className: `${themeStyles.textColor} opacity-40` })}
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
          <div className={groupHint({ className: `${themeStyles.textColor} opacity-60`})} hidden={!openCustomList}>
            Создайте свои списки задач
          </div>
        )}
      </div>

      <div className={groupContainer()}>
        <div
          className={groupToggler({ className: `${themeStyles.textColor} opacity-40` })}
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
          <div className={groupHint({ className: `${themeStyles.textColor} opacity-60`})} hidden={!openFilteredList}>
            Отображение задач, отфильтрованных по списку, дате, приоритету,
            метке и другим параметрам.
          </div>
        )}
      </div>

      <div className={groupContainer()}>
        <div
          className={groupToggler({ className: `${themeStyles.textColor} opacity-40` })}
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
          <div className={groupHint({ className: `${themeStyles.textColor} opacity-60`})} hidden={!openTaggedList}>
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

      {openDeleteGroupWindow && <DeleteGroupMenu setEditingGroupId={setEditingGroupId} editingGroupId={editingGroupId} onCloseContextMenu={handleCloseContextMenu} setOpenDeleteGroupWindow={setOpenDeleteGroupWindow}/> }

      {contextMenu.isOpen && <GroupsContextMenu groupId={contextMenu.groupId} onCloseContextMenu={handleCloseContextMenu} position={contextMenu.position} setEditingGroupId={setEditingGroupId} setOpenCreateGroupMenu={setOpenCreateGroupMenu} setOpenDeleteGroupWindow={setOpenDeleteGroupWindow}/>}
    </section>
  );
}
