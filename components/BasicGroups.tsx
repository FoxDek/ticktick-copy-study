import { Id } from "@/convex/_generated/dataModel";
import GroupCard from "./GroupCard";
import { icons } from "@/app/iconsLibrary";

interface BasicGroupsProps {
  activeGroup: string;
  setActiveGroup: (id: string) => void;
  handleOpenContextMenu: (event: React.MouseEvent, groupId: Id<"taskGroups"> | string) => void;
}

export default function BasicGroups({ activeGroup, setActiveGroup, handleOpenContextMenu }: BasicGroupsProps) {
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
        icon={icons["today"]}
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