import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import SwitchButton from '../SwitchButton';
import { userNotificationsDefaultSettings } from "@/app/constants/settings-data";
import TimePicker from "../TimePicker";
import { cva } from "class-variance-authority";

const notificationsTab = cva("notificationsTab flex flex-col gap-4 px-2");
const notificationsTabTitle = cva("notificationsTabTitle font-semibold");
const notificationsTabList = cva("notificationsTabList flex flex-col gap-4 text-sm w-full bg-gray-100/50 rounded-md px-4 py-3");
const notificationsTabListItem = cva("notificationsTabListItem flex flex-col gap-2");
const notificationsTabListItemDescription = cva("text-xs text-gray-400 font-light");

export default function NotificationsSettingsTab() {
  const handleTimeChange = (time: string) => {
    console.log(time);
  }

  const userData = useQuery(api.usersFunctions.currentUser);
  const userNotificationsSettings = userNotificationsDefaultSettings; // userData?.userNotificationsSettings ||

  return (
    <section className={notificationsTab()}>
      <h2 className={notificationsTabTitle()}>Уведомления</h2>
      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Ежедневные уведомления</span>
            <SwitchButton active={userNotificationsSettings.dailyNotifications} onToggle={() => {}} />
          </div>
          <p className={notificationsTabListItemDescription()}>
            TickTick может напоминать о твоих сегодняшних задачах в определенное время каждый день. Выберите время для ежедневных напоминаний.
          </p>
        </li>
        {userNotificationsSettings.dailyNotifications &&
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Время ежедневного напоминания</span>
            <TimePicker value="09:00" onChange={handleTimeChange} />
          </div>
        </li>}
      </ul>

      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Интернет-напоминание</span>
            <SwitchButton active={userNotificationsSettings.webNotifications} onToggle={() => {}} />
          </div>
        </li>
      </ul>

      <ul className={notificationsTabList()}>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Уведомления по электронной почте</span>
            <SwitchButton active={userNotificationsSettings.emailNotifications} onToggle={() => {}} />
          </div>
          <p className={notificationsTabListItemDescription()}>
            При включении вы сможете получать уведомления о задачах по электронной почте. Ежедневный лимит напоминаний составляет 50 раз.
          </p>
        </li>
        <li className={notificationsTabListItem()}>
          <div className="flex justify-between items-center">
            <span>Электронная почта</span>
            <span className="text-gray-500">{userData?.email}</span>
          </div>
        </li>
      </ul>
    </section>
  );
}
