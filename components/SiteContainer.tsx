'use client';

import AsideMenu from "@/components/AsideMenu";
import ProjectsListMenu from "@/components/ProjectsListMenu";
import { useSidebar } from "./SidebarProvider";

export default function SiteContainer({ children }: { children: React.ReactNode } ) {
  const {sidebarIsOpen} = useSidebar();

  return (
    <section className="siteContainer min-h-screen flex">
      <AsideMenu />
      <ProjectsListMenu sidebarIsOpen={sidebarIsOpen}/>
      <main className="w-full">{children}</main>
    </section>
  );
}
