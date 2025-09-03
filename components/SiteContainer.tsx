'use client';

import AsideMenu from "@/components/AsideMenu";
import ProjectsListMenu from "@/components/ProjectsListMenu";
import { useSidebar } from "./SidebarProvider";
import { Authenticated } from "convex/react";

export default function SiteContainer({ children }: { children: React.ReactNode } ) {
  const {sidebarIsOpen} = useSidebar();

  return (
    <section className="siteContainer min-h-screen flex">
      
      <Authenticated>
        <AsideMenu />
        <ProjectsListMenu sidebarIsOpen={sidebarIsOpen}/>
      </Authenticated>

      <main className="w-full">{children}</main>
    </section>
  );
}
