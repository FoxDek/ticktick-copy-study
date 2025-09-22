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
import colorThemesStyles from "@/app/constants/themes-styles";
import { useTheme } from "./ThemeProvider";

const asideMenu = cva(`asideMenu max-w-[50px] w-full px-2 py-4 flex-col items-center justify-between hidden xs:flex`);
const asideMenuNav = cva("asideMenuNav flex flex-col items-center gap-6 w-full");
const profileImageContainer = cva("profileImageContainer relative aspect-square w-full overflow-hidden rounded-md cursor-pointer");
const iconContainer = cva("iconContainer flex items-center justify-center w-5 group");
const iconSvg = cva("iconSvg w-full h-full duration-100 ease-in-out");

export default function AsideMenu({isUserContextMenuOpen, setIsUserContextMenuOpen}: {isUserContextMenuOpen: boolean, setIsUserContextMenuOpen: (value: boolean) => void}) {
  const [activeTab, setActiveTab] = useState('tasks');
  const { theme } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];

  return (
    <aside className={asideMenu({className: `${themeStyles.asideMenu}`})}>
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
          <CheckmarkIcon className={iconSvg({ className: activeTab === 'tasks' ? `${themeStyles.asideMenuIconsAccent}` : `${themeStyles.asideMenuIcons}` })} />
        </Link>
        <Link href={"/calendar"} className={iconContainer()} onClick={() => setActiveTab('calendar')}>
          <CalendarIcon className={iconSvg({ className: activeTab === 'calendar' ? `${themeStyles.asideMenuIconsAccent}` : `${themeStyles.asideMenuIcons}` })} />
        </Link>
        <Link href={"/search"} className={iconContainer()} onClick={() => setActiveTab('search')}>
          <SearchIcon className={iconSvg({ className: activeTab === 'search' ? `${themeStyles.asideMenuIconsAccent}` : `${themeStyles.asideMenuIcons}`})} />
        </Link>
      </nav>
      <div className={asideMenuNav({ className: "mb-3" })}>
        <Link href={"#"} className={iconContainer()}>
          <SyncIcon className={iconSvg({ className: `${themeStyles.asideMenuIcons}` })} />
        </Link>
        <Link href={"#"} className={iconContainer()}>
          <NotifIcon className={iconSvg({ className: `${themeStyles.asideMenuIcons}` })} />
        </Link>
        <Link href={"#"} className={iconContainer()}>
          <QuestionIcon className={iconSvg({ className: `${themeStyles.asideMenuIcons}` })} />
        </Link>
      </div>
    </aside>
  );
}
