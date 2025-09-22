import colorThemesStyles from "@/app/constants/themes-styles";
import { useUsersActions } from "@/app/hoocs/useUsersActions";
import { cva } from "class-variance-authority";
import { useTheme } from "../ThemeProvider";
import CheckIcon from "@/public/check-icon.svg";
import { themeSettingsCoversSources, themeSettingsOptions, themeSettingsOptionsLabels } from "@/app/constants/settings-data";
import Image from "next/image";

const themeTabCollection = cva("themeTabCollection flex flex-col gap-2");
const themeTabCollectionTitle = cva("themeTabCollectionTitle font-semibold");
const themeTabCollectionList = cva("themeTabCollectionList grid gap-4 items-start");
const themeCollectionItem = cva("themeColorItem flex flex-col gap-2 items-center cursor-pointer");
const themeColorItemPreview = cva("themeColorItemPreview aspect-square w-full max-w-15 rounded-md relative");
const themeImgItemPreview = cva('themeItemPreview aspect-video rounded-md w-full max-w-40 relative');
const themeColorItemLabel = cva("themeColorItemLabel text-xs truncate max-w-16");
const iconContainer = cva('iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm');
const checkIconContainer = cva('checkIconContainer absolute aspect-square -bottom-2 -right-2 flex items-center justify-center max-h-5 h-full w-auto group rounded-full p-1 border-2 border-white');

export default function ThemeThemeSubTab() {
  const { handleUpdateUserTheme } = useUsersActions();
  const { theme } = useTheme();
  const themeStyles = colorThemesStyles[theme as keyof typeof colorThemesStyles];

  return (
    <div className="themeSubTab flex flex-col gap-8">
      <div className={themeTabCollection()}>
        <h2 className={themeTabCollectionTitle()}>Цветная серия</h2>
        <ul className={themeTabCollectionList({ className: 'grid-cols-3 sm:grid-cols-6 md:grid-cols-8' })}>
          {themeSettingsOptions.theme.colorThemes.map((themeOption, i) => (
            <li key={i} className={themeCollectionItem()} onClick={() => handleUpdateUserTheme(themeOption)}>
              <span
                className={themeColorItemPreview({
                  className: `${colorThemesStyles[themeOption as keyof typeof colorThemesStyles].asideMenu} ${themeOption === 'default' && 'outline outline-gray-300'}`
                })}
              >
                {theme === themeOption && (
                  <span className={`iconContainer ${colorThemesStyles[themeOption as keyof typeof colorThemesStyles].accentBackground} absolute aspect-square -bottom-2 -right-2 flex items-center justify-center max-h-5 h-full w-auto group rounded-full p-1 border-2 border-white`}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </span>
              <span className={themeColorItemLabel({ className: `${themeStyles.textColor} opacity-70` })}>
                {themeSettingsOptionsLabels.theme[themeOption as keyof typeof themeSettingsOptionsLabels.theme]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={themeTabCollection()}>
        <h2 className={themeTabCollectionTitle()}>Серия &quot;Города&quot;</h2>
        <ul className={themeTabCollectionList({ className: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' })}>
          {themeSettingsOptions.theme.towmThemes.map((themeOption, i) => (
            <li key={i} className={themeCollectionItem()}>
              <span className={themeImgItemPreview()}>
                <Image
                  src={themeSettingsCoversSources[themeOption as keyof typeof themeSettingsCoversSources]}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                {theme === themeOption && (
                  <span className={checkIconContainer({ className: `${colorThemesStyles[themeOption as keyof typeof colorThemesStyles].accentBackground}` })}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </span>
              <span className={themeColorItemLabel({ className: `${themeStyles.textColor} opacity-70` })}>
                {themeSettingsOptionsLabels.theme[themeOption as keyof typeof themeSettingsOptionsLabels.theme]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={themeTabCollection()}>
        <h2 className={themeTabCollectionTitle()}>Серия &quot;Сезоны&quot;</h2>
        <ul className={themeTabCollectionList({ className: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' })}>
          {themeSettingsOptions.theme.seasonsThemes.map((themeOption, i) => (
            <li key={i} className={themeCollectionItem()}>
              <span className={themeImgItemPreview()}>
                <Image
                  src={themeSettingsCoversSources[themeOption as keyof typeof themeSettingsCoversSources]}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                {theme === themeOption && (
                  <span className={iconContainer({ className: `${colorThemesStyles[themeOption as keyof typeof colorThemesStyles].accentBackground}` })}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </span>
              <span className={themeColorItemLabel({ className: `${themeStyles.textColor} opacity-70` })}>
                {themeSettingsOptionsLabels.theme[themeOption as keyof typeof themeSettingsOptionsLabels.theme]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={themeTabCollection()}>
        <h2 className={themeTabCollectionTitle()}>Серия &quot;Фотографии&quot;</h2>
        <ul className={themeTabCollectionList({ className: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' })}>
          {themeSettingsOptions.theme.photosThemes.map((themeOption, i) => (
            <li key={i} className={themeCollectionItem()}>
              <span className={themeImgItemPreview()}>
                <Image
                  src={themeSettingsCoversSources[themeOption as keyof typeof themeSettingsCoversSources]}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                {theme === themeOption && (
                  <span className={iconContainer({ className: `${colorThemesStyles[themeOption as keyof typeof colorThemesStyles].accentBackground}` })}>
                    <CheckIcon className={`iconSvg w-full h-full ${theme === 'dark' ? '' : 'fill-white'}`} />
                  </span>
                )}
              </span>
              <span className={themeColorItemLabel({ className: `${themeStyles.textColor} opacity-70` })}>
                {themeSettingsOptionsLabels.theme[themeOption as keyof typeof themeSettingsOptionsLabels.theme]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
