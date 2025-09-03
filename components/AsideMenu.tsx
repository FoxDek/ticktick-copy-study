'use client';

import Image from "next/image";
import Link from "next/link";
import CheckmarkIcon from "@/public/checkmark-icon.svg";
import CalendarIcon from "@/public/calendar-icon.svg";
import SearchIcon from "@/public/search-icon.svg";
import SyncIcon from "@/public/sync-icon.svg";
import NotifIcon from "@/public/notif-icon.svg";
import QuestionIcon from "@/public/question-icon.svg";
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import AsideUserContextMenu from "./menu-components/AsideUserContextMenu";

const asideMenu = cva("asideMenu max-w-[50px] w-full px-2 py-4 flex flex-col items-center justify-between bg-gradient-to-b from-[#a596e0] via-[#796bb3] to-[#cfc7ed]");
const asideMenuNav = cva("asideMenuNav flex flex-col items-center gap-6 w-full");
const profileImageContainer = cva("profileImageContainer relative aspect-square w-full overflow-hidden rounded-md cursor-pointer");
const iconContainer = cva("iconContainer flex items-center justify-center w-5 group")
const iconSvg = cva("iconSvg w-full h-full duration-100 ease-in-out fill-white", {
  variants: {
    active: {
      true: "opacity-100",
      false: "opacity-40 group-hover:opacity-70",
    }
  }
})

export default function AsideMenu() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [isUserContextMenuOpen, setIsUserContextMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isUserContextMenuOpen &&
        e.target instanceof Element &&
        !e.target.closest(".asideUserContextMenu") &&
        !e.target.closest(".profileImageContainer")
      ) {
        setIsUserContextMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserContextMenuOpen]);

  return (
    <aside className={asideMenu()}>
      <nav className={asideMenuNav()}>
        <div className={profileImageContainer()} onClick={() => setIsUserContextMenuOpen(!isUserContextMenuOpen)}>
          <Image
            src={"/default-user-photo.png"}
            alt="User photo"
            fill
            className="object-cover"
          />
        </div>
        <Link href={"/tasks/all"} className={iconContainer()} onClick={() => setActiveTab('tasks')}>
          <CheckmarkIcon className={iconSvg({ active: activeTab === 'tasks' })} />
        </Link>
        <Link href={"/calendar"} className={iconContainer()} onClick={() => setActiveTab('calendar')}>
          <CalendarIcon className={iconSvg({ active: activeTab === 'calendar' })} />
        </Link>
        <Link href={"/search"} className={iconContainer()} onClick={() => setActiveTab('search')}>
          <SearchIcon className={iconSvg({ active: activeTab === 'search'})} />
        </Link>

        {isUserContextMenuOpen && <AsideUserContextMenu />}
      </nav>

      <div className={asideMenuNav({ className: "mb-3" })}>
        <Link href={"#"} className={iconContainer()}>
          <SyncIcon className={iconSvg({ active: activeTab === 'sync' })} />
        </Link>
        <Link href={"#"} className={iconContainer()}>
          <NotifIcon className={iconSvg({ active: activeTab === 'notifications' })} />
        </Link>
        <Link href={"#"} className={iconContainer()}>
          <QuestionIcon className={iconSvg({ active: activeTab === 'help' })} />
        </Link>
      </div>
    </aside>
  );
}