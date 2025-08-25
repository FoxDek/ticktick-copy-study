import { icons } from "@/app/iconsLibrary";
import CrossIcon from '@/public/cross-icon.svg'
import { cva } from "class-variance-authority";

interface IconsMenuProps {
  activeIcon: keyof typeof icons;
  setActiveIcon: (icon: keyof typeof icons) => void;
  setIconsMenuIsOpen: (isOpen: boolean) => void;
}

const iconsMenuSubstrate = cva(
  "iconsMenuSubstrate absolute top-9 left-0 w-full h-fit bg-white z-10 p-2 rounded-md shadow-xl/20 border border-gray-100"
);
const iconsMenuHeader = cva("iconsMenuHeader flex justify-between mb-4");
const iconsMenuTitle = cva("iconsMenuTitle text-xs font-bold opacity-50");
const iconContainer = cva(
  "iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm cursor-pointer"
);
const iconsMenuList = cva("iconsMenuList grid grid-cols-10 gap-2");
const iconsMenuListItem = cva("iconsMenuListItem icon-item cursor-pointer p-0.5 duration-100 ease-in-out outline-2 outline-transparent outline-offset-1 rounded-md", {
  variants: {
    active: {
      true: '!outline-[#a596e0]',
      false: 'hover:outline-gray-100',
    }
  }
});

export default function IconsMenu({
  activeIcon,
  setActiveIcon,
  setIconsMenuIsOpen
}: IconsMenuProps) {

  const handleSetIcon = (icon: keyof typeof icons) => {
    setActiveIcon(icon);
    setIconsMenuIsOpen(false);
  }

  return (
    <div className={iconsMenuSubstrate()}>
      <div className={iconsMenuHeader()}>
        <h2 className={iconsMenuTitle()}>Выберите иконку</h2>
        <span className={iconContainer()} onClick={() => setIconsMenuIsOpen(false)}>
          <CrossIcon className='iconSvg w-full h-full fill-icons text-icons' />
        </span>
      </div>
      <ul className={iconsMenuList()}>
        {Object.entries(icons).map(([key, IconComponent]) => (
          <li
            key={key}
            className={iconsMenuListItem({ active: activeIcon === key as keyof typeof icons })}
            onClick={() => handleSetIcon(key as keyof typeof icons)}
          >
            <IconComponent className="iconSvg w-full h-full fill-icons text-icons" />
          </li>
        ))}
      </ul>
    </div>
  );
}
