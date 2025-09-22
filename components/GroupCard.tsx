'use client';
import { useRouter } from "next/navigation";
import { ComponentType } from "react";
import MoreIcon from "@/public/more-icon.svg";
import { Id } from "@/convex/_generated/dataModel";
import { useTheme } from "./ThemeProvider";
import colorThemesStyles from "@/app/constants/themes-styles";
import { cva } from "class-variance-authority";

interface GroupCardProps {
  id: string;
  label: string;
  count: number;
  icon: ComponentType<React.SVGProps<SVGSVGElement>>; // сюда пойдёт SVG-компонент
  activeGroup: string;
  onSelect: (id: string) => void;
  handleOpenContextMenu: (event: React.MouseEvent, groupId: Id<"taskGroups"> | string) => void;
}

const groupCard = cva('groupCard group flex gap-2 justify-between items-center text-sm py-2.5 px-4 hover:bg-[#796bb3]/10 rounded-md cursor-pointer duration-100 ease-in-out')
const iconContainer = cva('iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm')
const moreIcon = cva("moreIcon w-full h-full opacity-70 group-hover/button:opacity-100")

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
  const { theme, sidebars } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];

  const handleSelect = () => {
    onSelect(id);
    router.push(`/tasks/${id}`);    
  };

  return (
    <li
      className={groupCard({ className: `${activeGroup === id ? "bg-[#796bb3]/10" : ""}`})}
      onClick={() => handleSelect()}
    >
      <span className={iconContainer()}>
        <Icon className={`iconSvg w-full h-full text-icons ${themeStyles.icons}`} />
      </span>
      <span className={`groupCardLabel mr-auto ${themeStyles.textColor}`}>{label}</span>
      {count > 0 && sidebars === 'all' && <span className={`text-xs group-hover:hidden ${themeStyles.textColor} opacity-60`}>{count}</span>}

      <button
        className={`aspect-square cursor-pointer hidden group-hover:block w-[13px] group/button`}
        onClick={(e) => handleOpenContextMenu(e, id)}
      >
        <MoreIcon className={moreIcon({ className: `${themeStyles.icons}`})} />
      </button>
    </li>
  );
}
