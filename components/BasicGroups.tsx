import { Id } from "@/convex/_generated/dataModel";
import GroupCard from "./GroupCard";
import { calendarIcons, icons } from "@/app/iconsLibrary";

interface BasicGroupsProps {
  activeGroup: string;
  setActiveGroup: (id: string) => void;
  handleOpenContextMenu: (event: React.MouseEvent, groupId: Id<"taskGroups"> | string) => void;
}

export default function BasicGroups({ activeGroup, setActiveGroup, handleOpenContextMenu }: BasicGroupsProps) {
  const today = new Date();

  return (
    <ul className="basicGroups flex flex-col mb-4">
      <GroupCard
        id="all"
        label="Все"
        count={9}
        icon={icons["all"]}
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        handleOpenContextMenu={handleOpenContextMenu}
      />

      <GroupCard
        id="today"
        label="Сегодня"
        count={3}
        icon={calendarIcons[today.getDate() as keyof typeof calendarIcons]}
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        handleOpenContextMenu={handleOpenContextMenu}
      />

      <GroupCard
        id="inbox"
        label="Входящие"
        count={1}
        icon={icons["inbox"]}
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        handleOpenContextMenu={handleOpenContextMenu}
      />
    </ul>
  );
}