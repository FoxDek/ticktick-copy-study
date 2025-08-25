import { cva } from "class-variance-authority";

const emptyTasksList = cva("emptyTasksList h-full w-full flex flex-col justify-center items-center gap-1")
const emptyTasksListTitle = cva("emptyTasksListTitle font-semibold text-sm")
const emptyTasksListHint = cva("emptyTasksListHint text-xs text-gray-500")

const activeGroupHint: Record<string, string> = {
  all: "Удивительно... задач нет совсем 🤔",
  today: "Сегодня можно отдохнуть под сериальчик 🍿",
  inbox: "Все идеи и задачи будут появляться здесь 📥",
}

export default function EmptyTasksList({activeGroup}: {activeGroup: string}) {
  const hint = activeGroupHint[activeGroup] ?? 'Нажмите на поле ввода, чтобы добавить задачу';

  return (
    <div className={emptyTasksList()}>
      <h3 className={emptyTasksListTitle()}>Нет задач</h3>
      <span className={emptyTasksListHint()}>{hint}</span>
    </div>
  );
}