import Link from "next/link";
import StatisticIcon from '@/public/statistic-icon.svg'
import SettingsIcon from '@/public/settings-icon.svg'
import ExitIcon from '@/public/exit-icon.svg'
import { cva } from "class-variance-authority";
import { useAuthActions } from "@convex-dev/auth/react";
import { useModalActions } from "@/app/hoocs/useModalActions";

interface AsideUserContextMenuProps {
  setIsUserContextMenuOpen: (isOpen: boolean) => void
}

const asideUserContextMenu = cva("asideUserContextMenu absolute top-4 left-13 w-full max-w-42 h-auto bg-white z-10 p-1 rounded-md shadow-xl/20 text-sm")
const asideUserContextMenuItem = cva("asideUserContextMenuItem flex items-center gap-2 py-1.5 px-3 hover:bg-gray-100 cursor-pointer rounded-sm duration-100 ease-in-out w-full")
const iconContainer = cva("iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto")
const iconSvg = cva('iconSvg w-full h-full fill-icons text-icons')

export default function AsideUserContextMenu({setIsUserContextMenuOpen}: AsideUserContextMenuProps) {
  const {signOut} = useAuthActions();
  const {openSettingsModal} = useModalActions();

  const handleOpenSettings = () => {
    openSettingsModal();
    setIsUserContextMenuOpen(false);
  }

  return (
    <ul className={asideUserContextMenu()}>

      <li className={asideUserContextMenuItem()} onClick={handleOpenSettings}>
        <span className={iconContainer()}>
          <SettingsIcon className={iconSvg()}/>
        </span>
        <span>Настройки</span>
      </li>

      <li className={asideUserContextMenuItem()}>
        <span className={iconContainer()}>
          <StatisticIcon className={iconSvg()}/>
        </span>
        <Link href={"#"}>Статистика</Link>
      </li>

      <li className={asideUserContextMenuItem()} onClick={() => signOut()}>
        <span className={iconContainer()}>
          <ExitIcon className={iconSvg()}/>
        </span>
        <Link href={"#"}>Выйти</Link>
      </li>

    </ul> 
  );
}