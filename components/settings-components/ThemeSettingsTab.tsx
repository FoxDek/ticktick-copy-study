import { cva } from "class-variance-authority";
import { useState } from "react";
import { useTheme } from '../ThemeProvider';
import colorThemesStyles from '../../app/constants/themes-styles';
import ThemeThemeSubTab from "./ThemeThemeSubTab";
import ThemeDisplaySubTab from "./ThemeDisplaySubTab";

const themeTab = cva("themeTab flex flex-col gap-4 px-2");
const themeTabNav = cva("themeTabNav flex self-center gap-2 text-xs");
const themeTabNavItem = cva("themeTabNavItem px-3 py-1.5 rounded-full duration-200 ease-in-out cursor-pointer", {
  variants: {
    active: {
      true: 'bg-purple-100 text-purple-400',
      false: 'text-gray-500 bg-gray-200/50'
    }
  }
});

export default function ThemeSettingsTab() {
  const [activeThemeSubTab, setActiveThemeSubTab] = useState('theme');
  const { theme } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];

  return (
    <section className={themeTab()}>
      <div className={themeTabNav()}>
        <button
          className={themeTabNavItem({ className: activeThemeSubTab === 'theme' ? `${themeStyles.textAccent} ${themeStyles.substrateBackgroundAccent}` : `${themeStyles.substrateBackground} ${themeStyles.textMuted}` })}
          onClick={() => setActiveThemeSubTab('theme')}
        >
          Тема
        </button>
        <button
          className={themeTabNavItem({ className:activeThemeSubTab === 'display' ? `${themeStyles.textAccent} ${themeStyles.substrateBackgroundAccent}` : `${themeStyles.substrateBackground} ${themeStyles.textMuted}` })}
          onClick={() => setActiveThemeSubTab('display')}
        >
          Отображение
        </button>
      </div>

      {activeThemeSubTab === 'theme' &&
      <ThemeThemeSubTab />
      }

      {activeThemeSubTab === 'display' &&
        <ThemeDisplaySubTab />
      }
    </section>
  );
}
