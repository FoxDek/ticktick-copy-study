'use client';
import { useModalActions } from "@/app/hoocs/useModalActions";
import { useSearchParams } from "next/navigation";
import CrossIcon from '@/public/cross-icon.svg'
import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import NavIcon from '@/public/sidebar-open-icon.svg'
import AccountSettingsTab from "./AccountSettingsTab";
import PremiumSettingsTab from "./PremiumSettingsTab";
import ModulesSettingsTab from "./ModulesSettingsTab";
import SmartListSettingsTab from "./SmartListSettingsTab";
import NotificationsSettingsTab from "./NotificationsSettingsTab";
import DateTimeSettingsTab from "./DateTimeSettingsTab";
import ThemeSettingsTab from "./ThemeSettingsTab";

const settingsMenuOverlay = cva("settingsMenuOverlay fixed inset-0 bg-black/20 z-40 flex items-center justify-center sm:px-15 sm:py-10");
const settingsMenu = cva("settingsMenu flex relative bg-white shadow-lg/20 sm:rounded-xl w-full h-full max-w-4xl sm:max-h-[650px] overflow-hidden");

const settingsMenuNav = cva("settingsMenuNav absolute z-10 select-none lg:translate-x-0 lg:static flex flex-col p-2 w-full h-full max-w-60 bg-gray-50 text-sm border-r border-gray-200 duration-300 ease-in-out text-gray-700", {
  variants: {
    open: {
      true: 'translate-x-0',
      false: '-translate-x-full'
    }
  }
});
const settingsMenuNavTitle = cva("settingsMenuNavTitle font-semibold text-base p-2");
const settingsMenuNavList = cva("settingsMenuNavList flex flex-col gap-0.5");
const settingsMenuNavItem = cva("settingsMenuNavItem py-2 px-3 hover:bg-gray-200/50 cursor-pointer rounded-md", {
  variants: {
    active: {
      true: 'bg-gray-200/50',
    }
  }
});
const iconContainer = cva("iconContainer aspect-square flex items-center justify-center max-h-4 h-full w-auto group rounded-sm cursor-pointer");

export default function SettingsMenu() {
  const modalType = useSearchParams().get('modalType');
  const { closeModal } = useModalActions();
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');
  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleChangeActiveTab = (tab: string) => {
    setActiveSettingsTab(tab);
    setNavIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navIsOpen &&
        e.target instanceof Element &&
        !e.target.closest(".settingsMenuNav")
      ) {
        setNavIsOpen(false);
      }

      // if (e.target instanceof Element && !e.target.closest(".settingsMenu") && !e.target.closest(".settingsMenuNav")) {
      //   closeModal();
      // }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navIsOpen]);


  return (
    <>
      {modalType === "settings" && (
        <section className={settingsMenuOverlay()} >

          <div className={settingsMenu()}>
            <nav className={settingsMenuNav({open: navIsOpen})}>
              <h3 className={settingsMenuNavTitle()}>Настройки</h3>
              <div className="overflow-y-auto h-full flex flex-col gap-5 mt-3">
                <ul className={settingsMenuNavList()}>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'account'})} onClick={() => handleChangeActiveTab('account')}>Аккаунт</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'premium'})} onClick={() => handleChangeActiveTab('premium')}>Премиум</li>
                </ul>
                <ul className={settingsMenuNavList()}>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'modules'})} onClick={() => handleChangeActiveTab('modules')}>Функциональные модули</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'smart-list'})} onClick={() => handleChangeActiveTab('smart-list')}>Умный список</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'notifications'})} onClick={() => handleChangeActiveTab('notifications')}>Уведомления</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'date-time'})} onClick={() => handleChangeActiveTab('date-time')}>Дата и время</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'theme'})} onClick={() => handleChangeActiveTab('theme')}>Внешний вид</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'more'})} onClick={() => handleChangeActiveTab('more')}>Больше</li>
                </ul>
                <ul className={settingsMenuNavList()}>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'import'})} onClick={() => handleChangeActiveTab('import')}>Интеграции и импорт</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'cooperation'})} onClick={() => handleChangeActiveTab('cooperation')}>Сотрудничество</li>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'hot-keys'})} onClick={() => handleChangeActiveTab('hot-keys')}>Горячие клавиши</li>
                </ul>
                <ul className={settingsMenuNavList()}>
                  <li className={settingsMenuNavItem({active: activeSettingsTab === 'about'})} onClick={() => handleChangeActiveTab('about')}>О приложении</li>
                </ul>
              </div>
            </nav>

            <div className={`settingsMenuContent w-full overflow-y-auto mt-8 p-4 ${activeSettingsTab === 'theme' && 'py-4 pl-4 pr-1 [scrollbar-gutter:stable]'}`}>
              {activeSettingsTab === 'account' && <AccountSettingsTab />}
              {activeSettingsTab === 'premium' && <PremiumSettingsTab />}
              {activeSettingsTab === 'modules' && <ModulesSettingsTab />}
              {activeSettingsTab === 'smart-list' && <SmartListSettingsTab />}
              {activeSettingsTab === 'notifications' && <NotificationsSettingsTab />}
              {activeSettingsTab === 'date-time' && <DateTimeSettingsTab />}
              {activeSettingsTab === 'theme' && <ThemeSettingsTab />}
              {activeSettingsTab === 'more' && <div>8</div>}
              {activeSettingsTab === 'import' && <div>9</div>}
              {activeSettingsTab === 'cooperation' && <div>10</div>}
              {activeSettingsTab === 'hot-keys' && <div>11</div>}
              {activeSettingsTab === 'about' && <div>12</div>}
            </div>


            <div className="settingsMenuHeader absolute top-4 flex justify-between items-center w-full px-4">
              <span className={iconContainer({className: ''})} onClick={() => setNavIsOpen(true)}>
                <NavIcon className='iconSvg w-full h-full fill-icons text-icons' />
              </span>
              <span className={iconContainer()} onClick={() => closeModal()}>
                <CrossIcon className='iconSvg w-full h-full fill-icons text-icons' />
              </span>
            </div>
          </div>

        </section>
      )}
    </>
  );
}
