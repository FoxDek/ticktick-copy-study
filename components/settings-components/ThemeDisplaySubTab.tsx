import { cva } from "class-variance-authority";
import CheckIcon from '@/public/check-icon.svg'
import InboxIcon from '@/public/inbox-icon.svg'
import CheckmarkIcon from '@/public/checkmark-icon.svg'
import { TodayTasksIcon } from "@/app/iconsLibrary";
import { themeSettingsOptions, themeSidebarsOptionsData, themeSettingsOptionsLabels } from "@/app/constants/settings-data";
import { useTheme } from "../ThemeProvider";
import colorThemesStyles from "@/app/constants/themes-styles";
import { useUsersActions } from "@/app/hoocs/useUsersActions";

// CVA селекторы
const themeTabTitle = cva("themeTabTitle font-semibold");
const iconContainer = cva('iconContainer aspect-square flex items-center justify-center max-h-3.5 h-full w-auto group rounded-sm');
const themeSubTab = cva("themeSubTab flex flex-col gap-2");
const themeTabDisplayList = cva("themeTabDisplayList grid grid-cols-1 sm:grid-cols-3 gap-4 my-2");
const themeTabCard = cva("themeTabCard flex flex-col gap-2");
const themeTabCardBody = cva("themeTabCardBody border border-gray-200 rounded-md p-4 flex flex-col gap-4 cursor-pointer relative");
const themeTabCardBodyPreview = cva("themeTabCardBodyPreview flex justify-between items-center");
const themeTabCardBodyPreviewAbout = cva("themeTabCardBodyPreviewAbout flex items-center gap-2");
const themeTabCardBodyPreviewCount = cva("themeTabCardBodyPreviewCount text-xs");
const themeTabCardLabel = cva("themeTabCardLabel self-center text-xs");

export default function ThemeDisplaySubTab() {
  const { theme, sidebars, completedStyle } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];
  const { handleUpdateUserSidebars, handleUpdateUserCompletedStyle } = useUsersActions();

  return (
    <>
      <div className={themeSubTab({className: `${themeStyles.textColor}`})}>
        <h2 className={themeTabTitle()}>Количество боковых панелей</h2>
        <ul className={themeTabDisplayList()}>
          {themeSettingsOptions.sidebars.map((sidebarOption, i) => (
            <li key={i} className={themeTabCard()}>
              <div className={themeTabCardBody()} onClick={() => handleUpdateUserSidebars(sidebarOption as 'all' | 'hide_note' | 'hide')}>
                <div className={themeTabCardBodyPreview()}>
                  <div className={themeTabCardBodyPreviewAbout()}>
                    <span className={iconContainer()}>
                      <TodayTasksIcon className={`iconSvg w-full h-full text-icons ${themeStyles.icons}`} />
                    </span>
                    <span className={themeTabCardBodyPreviewCount()}>Сегодня</span>
                  </div>
                  <span className="text-xs">{themeSidebarsOptionsData[sidebarOption as keyof typeof themeSidebarsOptionsData].todayCount > 0 && themeSidebarsOptionsData[sidebarOption as keyof typeof themeSidebarsOptionsData].todayCount}</span>
                </div>
                <div className={themeTabCardBodyPreview()}>
                  <div className={themeTabCardBodyPreviewAbout()}>
                    <span className={iconContainer()}>
                      <InboxIcon className={`iconSvg w-full h-full text-icons ${themeStyles.icons}`} />
                    </span>
                    <span className={themeTabCardBodyPreviewCount()}>Входящие</span>
                  </div>
                  <span className="text-xs">{themeSidebarsOptionsData[sidebarOption as keyof typeof themeSidebarsOptionsData].inboxCount > 0 && themeSidebarsOptionsData[sidebarOption as keyof typeof themeSidebarsOptionsData].inboxCount}</span>
                </div>
                {sidebars === sidebarOption && (
                  <span className={`iconContainer ${colorThemesStyles[theme as keyof typeof colorThemesStyles].accentBackground} absolute aspect-square -bottom-2 -right-2 flex items-center justify-center max-h-5 h-full w-auto group rounded-full p-1 border-2 border-white`}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </div>
              <p className={themeTabCardLabel({className: 'opacity-70'})}>{themeSettingsOptionsLabels.sidebars[sidebarOption as keyof typeof themeSettingsOptionsLabels.sidebars]}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={themeSubTab()}>
        <h2 className={themeTabTitle()}>Стиль завершенной задачи</h2>
        <ul className={themeTabDisplayList()}>
          {themeSettingsOptions.completedStyle.map((completedStyleOption, i) => (
            <li key={i} className={themeTabCard()}>
              <div className={themeTabCardBody()} onClick={() => handleUpdateUserCompletedStyle(completedStyleOption as 'default' | 'strikethrough')}>
                <div className={themeTabCardBodyPreview()}>
                  <div className={themeTabCardBodyPreviewAbout({className: 'opacity-30'})}>
                    <span className={iconContainer()}>
                      <CheckmarkIcon className={`iconSvg w-full h-full text-icons ${themeStyles.icons}`} />
                    </span>
                    <span className={`${themeTabCardBodyPreviewCount()} ${completedStyleOption === 'strikethrough' && 'line-through'}`}>Название задачи</span>
                  </div>
                </div>
                <div className={themeTabCardBodyPreview()}>
                  <div className={themeTabCardBodyPreviewAbout({className: 'opacity-30'})}>
                    <span className={iconContainer()}>
                      <CheckmarkIcon className={`iconSvg w-full h-full text-icons ${themeStyles.icons}`} />
                    </span>
                    <span className={`${themeTabCardBodyPreviewCount()} ${completedStyleOption === 'strikethrough' && 'line-through'}`}>Название задачи</span>
                  </div>
                </div>
                {completedStyle === completedStyleOption && (
                  <span className={`iconContainer ${colorThemesStyles[theme as keyof typeof colorThemesStyles].accentBackground} absolute aspect-square -bottom-2 -right-2 flex items-center justify-center max-h-5 h-full w-auto group rounded-full p-1 border-2 border-white`}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </div>
              <p className={themeTabCardLabel({className: 'opacity-70'})}>{themeSettingsOptionsLabels.completedStyle[completedStyleOption as keyof typeof themeSettingsOptionsLabels.completedStyle]}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
