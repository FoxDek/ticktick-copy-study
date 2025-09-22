import AllTasksIcon from "@/public/all-tasks-icon.svg";
import InboxTasksIcon from "@/public/inbox-icon.svg";
import PlusIcon from "@/public/plus-icon.svg";
import CheckmarkNoBg from "@/public/checkmark-noback-icon.svg";
import TrashIcon from "@/public/trash-icon.svg";
import NewListIcon from "@/public/new-list-icon.svg"; 

import calendarIcon1 from "@/public/calendar-day-icons/calendar-1-icon.svg";
import calendarIcon2 from "@/public/calendar-day-icons/calendar-2-icon.svg"; 
import calendarIcon3 from "@/public/calendar-day-icons/calendar-3-icon.svg"; 
import calendarIcon4 from "@/public/calendar-day-icons/calendar-4-icon.svg"; 
import calendarIcon5 from "@/public/calendar-day-icons/calendar-5-icon.svg"; 
import calendarIcon6 from "@/public/calendar-day-icons/calendar-6-icon.svg"; 
import calendarIcon7 from "@/public/calendar-day-icons/calendar-7-icon.svg"; 
import calendarIcon8 from "@/public/calendar-day-icons/calendar-8-icon.svg";
import calendarIcon9 from "@/public/calendar-day-icons/calendar-9-icon.svg";
import calendarIcon10 from "@/public/calendar-day-icons/calendar-10-icon.svg";
import calendarIcon11 from "@/public/calendar-day-icons/calendar-11-icon.svg";
import calendarIcon12 from "@/public/calendar-day-icons/calendar-12-icon.svg";
import calendarIcon13 from "@/public/calendar-day-icons/calendar-13-icon.svg";
import calendarIcon14 from "@/public/calendar-day-icons/calendar-14-icon.svg";
import calendarIcon15 from "@/public/calendar-day-icons/calendar-15-icon.svg";
import calendarIcon16 from "@/public/calendar-day-icons/calendar-16-icon.svg";
import calendarIcon17 from "@/public/calendar-day-icons/calendar-17-icon.svg";
import calendarIcon18 from "@/public/calendar-day-icons/calendar-18-icon.svg";
import calendarIcon19 from "@/public/calendar-day-icons/calendar-19-icon.svg";
import calendarIcon20 from "@/public/calendar-day-icons/calendar-20-icon.svg";
import calendarIcon21 from "@/public/calendar-day-icons/calendar-21-icon.svg";
import calendarIcon22 from "@/public/calendar-day-icons/calendar-22-icon.svg";
import calendarIcon23 from "@/public/calendar-day-icons/calendar-23-icon.svg";
import calendarIcon24 from "@/public/calendar-day-icons/calendar-24-icon.svg";
import calendarIcon25 from "@/public/calendar-day-icons/calendar-25-icon.svg";
import calendarIcon26 from "@/public/calendar-day-icons/calendar-26-icon.svg";
import calendarIcon27 from "@/public/calendar-day-icons/calendar-27-icon.svg";
import calendarIcon28 from "@/public/calendar-day-icons/calendar-28-icon.svg";
import calendarIcon29 from "@/public/calendar-day-icons/calendar-29-icon.svg";
import calendarIcon30 from "@/public/calendar-day-icons/calendar-30-icon.svg";
import calendarIcon31 from "@/public/calendar-day-icons/calendar-31-icon.svg";


const calendarIcons = {
  1: calendarIcon1,
  2: calendarIcon2,
  3: calendarIcon3,
  4: calendarIcon4,
  5: calendarIcon5,
  6: calendarIcon6,
  7: calendarIcon7,
  8: calendarIcon8,
  9: calendarIcon9,
  10: calendarIcon10,
  11: calendarIcon11,
  12: calendarIcon12,
  13: calendarIcon13,
  14: calendarIcon14,
  15: calendarIcon15,
  16: calendarIcon16,
  17: calendarIcon17,
  18: calendarIcon18,
  19: calendarIcon19,
  20: calendarIcon20,
  21: calendarIcon21,
  22: calendarIcon22,
  23: calendarIcon23,
  24: calendarIcon24,
  25: calendarIcon25,
  26: calendarIcon26,
  27: calendarIcon27,
  28: calendarIcon28,
  29: calendarIcon29,
  30: calendarIcon30,
  31: calendarIcon31
}

const today = new Date();
export const TodayTasksIcon = calendarIcons[today.getDate() as keyof typeof calendarIcons]

export const icons = {
  all: AllTasksIcon,
  today: TodayTasksIcon,
  tomorrow: PlusIcon,
  next7days: PlusIcon,
  assignedToMe: PlusIcon,
  inbox: InboxTasksIcon,
  summary: PlusIcon,
  tags: PlusIcon,
  filters: PlusIcon,
  completed: PlusIcon,
  cancelled: PlusIcon,
  deleted: PlusIcon,
  plus: PlusIcon,
  checkmarkNoBg: CheckmarkNoBg,
  trash: TrashIcon,
  newList: NewListIcon,
};

// export type IconName = keyof typeof icons;
// export const iconNames = ["all", "today", "inbox", "plus", "checkmarkNoBg", "trash", "newList"] as const;
// export type IconName = typeof iconNames[number];