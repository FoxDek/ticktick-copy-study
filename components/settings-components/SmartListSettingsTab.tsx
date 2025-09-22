import { cva } from "class-variance-authority";
import SelectionIcon from '@/public/selection-icon.svg'
import { icons } from "@/app/iconsLibrary";
import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CheckIcon from "@/public/check-icon.svg";
import { userChosenDefaultSmarts, smartlistOptionsLabels, smartlistSettingsLabels, smartlistSettings } from "@/app/constants/settings-data";

const smartlistTab = cva("smartlistTab flex flex-col gap-4 px-2");
const smartlistTabTitle = cva("smartlistTabTitle font-semibold");
const smartlistTabList = cva("smartlistTabList text-sm w-full bg-gray-100/50 rounded-md relative select-none");
const smartlistTabListItem = cva("smartlistTabListItem w-full flex justify-between py-2.5 px-4");
const smartlistTabListItemLabel = cva("smartlistTabListItemLabel flex gap-2 items-center");
const smartlistTabListItemSelection = cva("smartlistTabListItemSelection flex items-center gap-1 cursor-pointer hover:bg-gray-200/60 px-2 rounded-md duration-100 ease-in-out");
const smartlistTabListItemSelectionName = cva("smartlistTabListItemSelectionName text-gray-500");
const smartlistTabListItemSelectionNameLabel = cva("smartlistTabListItemSelectionName");
const iconContainer = cva("iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm");
const iconContainerSmall = cva("iconContainer aspect-square flex items-center justify-center max-h-2 h-full w-auto group rounded-sm");
const selectionMenu = cva("selectionMenu bg-white w-fit fixed shadow-lg rounded-md p-1 z-50 transform -translate-x-full mt-1 text-sm");
const selectionMenuList = cva("selectionMenuList flex flex-col whitespace-nowrap");
const selectionMenuItem = cva('selectionMenuItem py-1.5 px-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-5 justify-between', {
  variants: {
    active: {
      true: 'text-purple-400',
      false: 'bg-transparent',
    }
  }
});
const checkIconCvg = cva('fill-purple-400 w-3 right-3');

export default function SmartListSettingsTab() {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    settings: string[];
    position: { x: number; y: number };
    mode: string | number;
  }>({ isOpen: false, settings: ['show', 'hide'], position: { x: 0, y: 0 }, mode: '' });
  const userData = useQuery(api.usersFunctions.currentUser);
  const chosenSmarts = userData?.chosenSmarts || userChosenDefaultSmarts;

  const handleOpenContextMenu = (
    event: React.MouseEvent,
    settings: string[],
    mode: string | number,
  ) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({ isOpen: true, settings, position: { x: rect.right, y: rect.bottom }, mode });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isOpen: false, settings: [], position: { x: 0, y: 0 }, mode: '' });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenu.isOpen &&
        e.target instanceof Element &&
        !e.target.closest(".selectionMenu")
      ) {
        handleCloseContextMenu();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu.isOpen]);

  return (
    <section className={smartlistTab()}>
      <h2 className={smartlistTabTitle()}>Умный список</h2>
      <div className={smartlistTabList()}>
        {chosenSmarts.slice(0, 7).map((smartlist) => {
          const IconComponent = icons[smartlist.name as keyof typeof icons];
          return (
          <li key={smartlist.name} className={smartlistTabListItem()}>
            <div className={smartlistTabListItemLabel()}>
              <span className={iconContainer()}>
                <IconComponent className="iconSvg w-full h-full fill-icons text-white" />
              </span>
              <span className={smartlistTabListItemSelectionNameLabel()}>{smartlistSettingsLabels[smartlist.name as keyof typeof smartlistSettingsLabels]}</span>
            </div>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, smartlistSettings[smartlist.name as keyof typeof smartlistSettings], smartlist.mode)}>
              <span className={smartlistTabListItemSelectionName()}>{smartlistOptionsLabels[smartlist.mode as keyof typeof smartlistOptionsLabels]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </li>
          );
        })}
      </div>

      <div className={smartlistTabList()}>
        {chosenSmarts.slice(7, 9).map((smartlist) => {
          const IconComponent = icons[smartlist.name as keyof typeof icons];
          return (
          <li key={smartlist.name} className={smartlistTabListItem()}>
            <div className={smartlistTabListItemLabel()}>
              <span className={iconContainer()}>
                <IconComponent className="iconSvg w-full h-full fill-icons text-white" />
              </span>
              <span className={smartlistTabListItemSelectionNameLabel()}>{smartlistSettingsLabels[smartlist.name as keyof typeof smartlistSettingsLabels]}</span>
            </div>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, smartlistSettings[smartlist.name as keyof typeof smartlistSettings], smartlist.mode)}>
              <span className={smartlistTabListItemSelectionName()}>{smartlistOptionsLabels[smartlist.mode as keyof typeof smartlistOptionsLabels]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </li>
          );
        })}
      </div>
      <div className={smartlistTabList()}>
        {chosenSmarts.slice(9, 12).map((smartlist) => {
          const IconComponent = icons[smartlist.name as keyof typeof icons];
          return (
          <li key={smartlist.name} className={smartlistTabListItem()}>
            <div className={smartlistTabListItemLabel()}>
              <span className={iconContainer()}>
                <IconComponent className="iconSvg w-full h-full fill-icons text-white" />
              </span>
              <span className={smartlistTabListItemSelectionNameLabel()}>{smartlistSettingsLabels[smartlist.name as keyof typeof smartlistSettingsLabels]}</span>
            </div>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, smartlistSettings[smartlist.name as keyof typeof smartlistSettings], smartlist.mode)}>
              <span className={smartlistTabListItemSelectionName()}>{smartlistOptionsLabels[smartlist.mode as keyof typeof smartlistOptionsLabels]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </li>
          );
        })}
      </div>
      {contextMenu.isOpen &&
        <div className={selectionMenu()} style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
          <ul className={selectionMenuList()}>
            {contextMenu.settings.map((setting) => (
              <li
                key={setting}
                className={selectionMenuItem({ active: setting === contextMenu.mode })}
                onClick={() => handleCloseContextMenu()}
              >
                <span>{smartlistOptionsLabels[setting as keyof typeof smartlistOptionsLabels]}</span>
                {setting === contextMenu.mode && <CheckIcon className={checkIconCvg()} />}
              </li>
            ))}
          </ul>
        </div>
      }
    </section>
  );
}
