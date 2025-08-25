import AllTasksIcon from "@/public/all-tasks-icon.svg";
import TodayTasksIcon from "@/public/today-tasks-icon.svg";
import InboxTasksIcon from "@/public/inbox-icon.svg";
import PlusIcon from "@/public/plus-icon.svg";
import CheckmarkNoBg from "@/public/checkmark-noback-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import NewListIcon from "@/public/new-list-icon.svg"; 

export const icons = {
  all: AllTasksIcon,
  today: TodayTasksIcon,
  inbox: InboxTasksIcon,
  plus: PlusIcon,
  checkmarkNoBg: CheckmarkNoBg,
  trash: TrashIcon,
  newList: NewListIcon
};

// export type IconName = keyof typeof icons;
// export const iconNames = ["all", "today", "inbox", "plus", "checkmarkNoBg", "trash", "newList"] as const;
// export type IconName = typeof iconNames[number];