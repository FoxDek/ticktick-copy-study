import { cva } from "class-variance-authority";
import SwitchButton from "../SwitchButton";
import { dateTimeDefaultSettings, dateTimeSettingsOptions, dateTimeOptionsLabels } from "@/app/constants/settings-data";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CheckIcon from "@/public/check-icon.svg";
import SelectionIcon from '@/public/selection-icon.svg'
import { useEffect, useState } from "react";

const notificationsTab = cva("notificationsTab flex flex-col gap-4 px-2");
const notificationsTabTitle = cva("notificationsTabTitle font-semibold");
const notificationsTabList = cva("notificationsTabList flex flex-col gap-4 text-sm w-full bg-gray-100/50 rounded-md px-4 py-3");
const notificationsTabListItem = cva("notificationsTabListItem flex flex-col gap-2");
const notificationsTabListItemDescription = cva("text-xs text-gray-400 font-light");

const smartlistTabListItemSelection = cva("smartlistTabListItemSelection flex items-center gap-1 cursor-pointer hover:bg-gray-200/60 px-2 rounded-md duration-100 ease-in-out");
const smartlistTabListItemSelectionName = cva("smartlistTabListItemSelectionName text-gray-500 select-none");
const iconContainerSmall = cva("iconContainer aspect-square flex items-center justify-center max-h-2 h-full w-auto group rounded-sm");

const selectionMenu = cva("selectionMenu bg-white w-fit fixed shadow-lg rounded-md p-1 z-50 transform -translate-x-full mt-1 text-sm select-none");
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

export default function DateTimeSettingsTab() {
  const [contextMenu, setContextMenu] = useState<{
      isOpen: boolean;
      settings: string[];
      position: { x: number; y: number };
      mode: string | number;
    }>({ isOpen: false, settings: ['show', 'hide'], position: { x: 0, y: 0 }, mode: '' });
  const userData = useQuery(api.usersFunctions.currentUser);
  const userDateTimeSettings = dateTimeDefaultSettings; // userData?.userNotificationsSettings ||

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

  // Честно, не шарю, как эта проверка работает, но она работает
  const getSettingValue = (mode: string | number, setting: string): string => {
    const modeKey = mode as keyof typeof dateTimeOptionsLabels;
    const option = dateTimeOptionsLabels[modeKey];
    
    if (typeof option === 'object' && option !== null) {
      const settingKey = setting as keyof typeof option;
      return option[settingKey] || '';
    }
    
    return '';
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
    <section className={notificationsTab()}>
      <h2 className={notificationsTabTitle()}>Дата и время</h2>
      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Формат времени</span>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, dateTimeSettingsOptions.timeFormat, 'timeFormat')}>
              <span className={smartlistTabListItemSelectionName()}>{dateTimeOptionsLabels.timeFormat[userDateTimeSettings.timeFormat as keyof typeof dateTimeOptionsLabels.timeFormat]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </div>
        </li>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>День начала недели</span>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, dateTimeSettingsOptions.firstWeekDay, 'firstWeekDay')}>
              <span className={smartlistTabListItemSelectionName()}>{dateTimeOptionsLabels.firstWeekDay[userDateTimeSettings.firstWeekDay as keyof typeof dateTimeOptionsLabels.firstWeekDay]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </div>
        </li>
      </ul>

      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Дополнительный календарь</span>
            <div className={smartlistTabListItemSelection()} onClick={(event) => handleOpenContextMenu(event, dateTimeSettingsOptions.additionalCalendar, 'additionalCalendar')}>
              <span className={smartlistTabListItemSelectionName()}>{dateTimeOptionsLabels.additionalCalendar[userDateTimeSettings.additionalCalendar as keyof typeof dateTimeOptionsLabels.additionalCalendar]}</span>
              <span className={iconContainerSmall()}>
                <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
              </span>
            </div>
          </div>
        </li>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Показать номера недели (Н)</span>
            <SwitchButton active={userDateTimeSettings.timeZone} onToggle={() => {}} />
          </div>
        </li>
      </ul>

      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Часовой пояс</span>
            <SwitchButton active={userDateTimeSettings.timeZone} onToggle={() => {}} />
          </div>
          <p className={notificationsTabListItemDescription()}>
            Если этот параметр включен, вы можете выбрать часовой пояс при установке времени для выполнения задач.
          </p>
        </li>
      </ul>

      {contextMenu.isOpen &&
        <div className={selectionMenu()} style={{ top: contextMenu.position.y, left: contextMenu.position.x }}>
          <ul className={selectionMenuList()}>
            {contextMenu.settings.map((setting) => (
              <li
                key={setting}
                className={selectionMenuItem({ active: userDateTimeSettings[contextMenu.mode as keyof typeof userDateTimeSettings] === setting })}
                onClick={() => handleCloseContextMenu()}
              >
                <span>{getSettingValue(contextMenu.mode, setting)}</span>
                {userDateTimeSettings[contextMenu.mode as keyof typeof userDateTimeSettings] === setting && <CheckIcon className={checkIconCvg()} />}
              </li>
            ))}
          </ul>
        </div>
      }

    </section>
  );
}