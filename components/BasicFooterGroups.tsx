import { Id } from "@/convex/_generated/dataModel";
import GroupCard from "./GroupCard";
import { icons } from "@/app/iconsLibrary";

interface BasicGroupsProps {
  activeGroup: string;
  setActiveGroup: (id: string) => void;
  handleOpenContextMenu: (event: React.MouseEvent, groupId: Id<"taskGroups"> | string) => void;
}

export default function BasicFooterroups({ activeGroup, setActiveGroup, handleOpenContextMenu }: BasicGroupsProps) {
  return (
    <ul className="mt-4 groupsContainer mb-4" >
      <GroupCard
        id="completed"
        label="Выполнено"
        count={0}
        icon={icons["checkmarkNoBg"]}
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        handleOpenContextMenu={handleOpenContextMenu}
      />
      <GroupCard
        id="deleted"
        label="Корзина"
        count={0}
        icon={icons["trash"]}
        activeGroup={activeGroup}
        onSelect={setActiveGroup}
        handleOpenContextMenu={handleOpenContextMenu}
      />
    </ul>
  );
}