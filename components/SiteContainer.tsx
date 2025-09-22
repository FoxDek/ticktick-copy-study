'use client';

import AsideMenu from "@/components/AsideMenu";
import ProjectsListMenu from "@/components/ProjectsListMenu";
import { useSidebar } from "./SidebarProvider";
import { Authenticated } from "convex/react";
import SettingsMenu from "./settings-components/SettingsMenu";
import { ThemeSwitcher } from './ThemeSwitcher';

export default function SiteContainer({ children }: { children: React.ReactNode } ) {
  const {sidebarIsOpen} = useSidebar();

  return (
    <section className="siteContainer min-h-screen flex">
      
      <Authenticated>
        <AsideMenu />
        <ProjectsListMenu sidebarIsOpen={sidebarIsOpen}/>
        <SettingsMenu />
      </Authenticated>

      <main className="w-full">{children}</main>

      <ThemeSwitcher />
    </section>
  );
}
