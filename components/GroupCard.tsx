'use client';
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import MoreIcon from "@/public/more-icon.svg";
import { Id } from "@/convex/_generated/dataModel";

interface GroupCardProps {
  id: string;
  label: string;
  count: number;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>; // сюда пойдёт SVG-компонент
  activeGroup: string;
  onSelect: (id: string) => void;
  handleOpenContextMenu: (event: React.MouseEvent, groupId: Id<"taskGroups"> | string) => void;
}

export default function GroupCard({
  id,
  label,
  count,
  icon: Icon,
  activeGroup,
  onSelect,
  handleOpenContextMenu,
}: GroupCardProps) {

  const router = useRouter();

  const handleSelect = () => {
    onSelect(id);
    router.push(`/tasks/${id}`);    
  };

  return (
    <li
      className={`
        groupCard group flex gap-2 justify-between items-center text-sm py-2.5 px-4 hover:bg-[#796bb3]/10 rounded-md cursor-pointer duration-100 ease-in-out
        ${activeGroup === id ? "bg-[#796bb3]/10" : ""}
      `}
      onClick={() => handleSelect()}
    >
      <span className="aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm">
        <Icon className="iconSvg w-full h-full fill-icons text-icons" />
      </span>
      <span className="mr-auto">{label}</span>
      {count > 0 && <span className="text-xs text-gray-400 group-hover:hidden">{count}</span>}

      <button
        className={`aspect-square cursor-pointer hidden group-hover:block w-[13px] group/button`}
        onClick={(e) => handleOpenContextMenu(e, id)}
      >
        <MoreIcon className="w-full h-full fill-icons opacity-70 group-hover/button:opacity-100" />
      </button>
    </li>
  );
}
