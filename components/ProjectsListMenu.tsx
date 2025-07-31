import { cva } from "class-variance-authority";

const projectsListMenu = cva("projectsListMenu w-[320px] bg-gradient-to-b from-[#e0e2f8] to-[#f4ecf9]")

export default function Page(sidebarIsOpen: { sidebarIsOpen: boolean }) {
  return (
    <div className={projectsListMenu()} hidden={!sidebarIsOpen.sidebarIsOpen}>
      
    </div>
  );
}
