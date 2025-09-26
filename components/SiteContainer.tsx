'use client';

import AsideMenu from "@/components/AsideMenu";
import ProjectsListMenu from "@/components/ProjectsListMenu";
import { useSidebar } from "./SidebarProvider";
import { Authenticated } from "convex/react";
import SettingsMenu from "./settings-components/SettingsMenu";
// import { ThemeSwitcher } from './ThemeSwitcher';
import { useEffect, useState } from "react";
import AsideUserContextMenu from "./menu-components/AsideUserContextMenu";

export default function SiteContainer({ children }: { children: React.ReactNode } ) {
  const {sidebarIsOpen, setSidebarIsOpen} = useSidebar();
  const [isUserContextMenuOpen, setIsUserContextMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarIsOpen && 
        window.matchMedia('(max-width: 48rem)').matches &&
        e.target instanceof Element &&
        !e.target.closest(".projectsListMenu") &&
        !e.target.closest(".asideMenu") &&
        !e.target.closest(".settingsMenu")
      ) {
        setSidebarIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarIsOpen]);

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
    <section className="siteContainer min-h-[100dvh] flex relative overflow-hidden">
      
      <Authenticated>
        <AsideMenu isUserContextMenuOpen={isUserContextMenuOpen} setIsUserContextMenuOpen={setIsUserContextMenuOpen}/>
        <ProjectsListMenu sidebarIsOpen={sidebarIsOpen} setIsUserContextMenuOpen={setIsUserContextMenuOpen}/>
        <SettingsMenu />
        {isUserContextMenuOpen && <AsideUserContextMenu setIsUserContextMenuOpen={setIsUserContextMenuOpen}/>}
      </Authenticated>

      <main className={`relative w-full after:duration-300 after:ease-in-out ${sidebarIsOpen ? "max-sm:after:content-[''] max-sm:after:absolute max-sm:after:inset-0 max-sm:after:bg-black/50  after:opacity-100 max-sm:after:z-10" : "after:opacity-0"}`}>{children}</main>

      {/* <ThemeSwitcher /> */}
    </section>
  );
}
