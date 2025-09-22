import { cva } from "class-variance-authority";
import Image from "next/image";
import CameraIcon from '@/public/camera-icon.svg'

const profileImageContainer = cva("profileImageContainer relative aspect-square w-full max-w-18 overflow-hidden rounded-full cursor-pointer group");
const iconContainer = cva("iconContainer aspect-square flex items-center justify-center max-h-9 h-full w-auto group rounded-sm cursor-pointer");
const accountTab = cva("accountTab flex flex-col items-center gap-4");
const accountTabHeader = cva("accountTabHeader flex flex-col items-center gap-1 mb-4");
const profileImageOverlay = cva("profileImageOverlay absolute w-full h-full bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center duration-100 ease-in-out");
const accountTabName = cva("accountTabName py-0.5 px-2 hover:bg-gray-100 cursor-pointer rounded-md");
const accountTabPremium = cva("accountTabPremium text-xs text-yellow-500 cursor-pointer");
const accountTabList = cva("accountTabList text-sm w-full bg-gray-100/50 rounded-md");
const accountTabListItem = cva("accountTabListItem w-full flex justify-between py-2.5 px-4");
const accountTabListItemLabel = cva("accountTabListItemLabel");
const accountTabListItemValue = cva("accountTabListItemValue select-none cursor-pointer px-1.5 rounded-sm duration-100 ease-in-out", {
  variants: {
    active: {
      true: 'text-purple-400 hover:text-purple-500',
      false: 'text-gray-400 hover:bg-gray-200/50',
    }
  }
});

export default function AccountSettingsTab() {
  return (
    <section className={accountTab()}>
      <div className={accountTabHeader()}>
        <div className={profileImageContainer()}>
          <Image
            src={"/default-user-photo.png"}
            alt="User photo"
            fill
            className="object-cover"
          />
          <div className={profileImageOverlay()}>
            <span className={iconContainer()}>
              <CameraIcon className='iconSvg w-full h-full fill-transparent text-white' />
            </span>
          </div>
        </div>
        <p className={accountTabName()}>Name Surname</p>
        <span className={accountTabPremium()}>Премиум-функции</span>
      </div>
      <ul className={accountTabList()}>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Электронная почта</span>
          <a className={accountTabListItemValue({ active: false })}>tema_foxes@mail.ru</a>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Пароль</span>
          <a className={accountTabListItemValue({ active: true })}>Изменить пароль</a>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Двухфакторная аутентификация</span>
          <a className={accountTabListItemValue({ active: true })}>Настройка</a>
        </li>
      </ul>
      <ul className={accountTabList()}>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Google</span>
          <a className={accountTabListItemValue({ active: true })}>Связать</a>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Apple</span>
          <a className={accountTabListItemValue({ active: false })}>Связано</a>
        </li>
      </ul>
      <ul className={accountTabList()}>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Входные устройства</span>
          <a className={accountTabListItemValue({ active: true })}>Управлять</a>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Токен API</span>
          <a className={accountTabListItemValue({ active: true })}>Управлять</a>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Бэкап и восстановление</span>
          <div className="flex gap-4">
            <a className={accountTabListItemValue({ active: true })}>Создание бэкапа</a>
            <a className={accountTabListItemValue({ active: true })}>Резервные копии</a>
          </div>
        </li>
        <li className={accountTabListItem()}>
          <span className={accountTabListItemLabel()}>Управление учетной записью</span>
          <a className={accountTabListItemValue({ className: "text-red-600 whitespace-nowrap" })}>Удалить аккаунт</a>
        </li>
      </ul>
    </section>
  );
}
