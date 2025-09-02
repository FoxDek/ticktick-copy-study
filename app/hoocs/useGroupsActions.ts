import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback } from "react";
import { icons } from "../iconsLibrary";

interface GroupProps {
  name: string;
  color: string;
  icon: keyof typeof icons;
}

interface UpdateGroupProps {
  groupId: Id<"taskGroups">;
  patch: GroupProps;
}

export function useGroupsActions() {
  const createCustomGroup = useMutation(api.groupsFunctions.createCustomGroup)
  const deleteCustomGroup = useMutation(api.groupsFunctions.deleteCustomGroup)
  const updateCustomGroup = useMutation(api.groupsFunctions.updateCustomGroup)

  const handleCreateCustomGroup = useCallback(({ name, color, icon }: GroupProps) => {
    console.log('handleCreateCustomGroup called, name:', name, 'color:', color, 'icon:', icon);
    createCustomGroup({ name, color, icon })
  }, [createCustomGroup]);

  const handleDeleteCustomGroup = useCallback(({ groupId }: { groupId: Id<"taskGroups"> }) => {
    console.log('handleDeleteCustomGroup called, groupId:', groupId);
    return deleteCustomGroup({ groupId })
  }, [deleteCustomGroup]);

  const handleUpdateCustomGroup = useCallback(({ groupId, patch: { name, color, icon } }: UpdateGroupProps) => {
    console.log('handleUpdateCustomGroup called, groupId:', groupId, 'name:', name, 'color:', color, 'icon:', icon);
    updateCustomGroup({groupId, patch: { name, color, icon }})
  }, [updateCustomGroup]);

  const handleUpdateGroupName = useCallback(({ groupId, name }: { groupId: Id<"taskGroups">; name: string }) => {
    console.log('handleUpdateGroupName called, groupId:', groupId, 'name:', name);
    updateCustomGroup({groupId, patch: { name }})
  }, [updateCustomGroup]);

  // const handleGetGroups = useCallback(() => {
    
  // }, [])

  return {
    handleCreateCustomGroup,
    handleDeleteCustomGroup,
    handleUpdateCustomGroup,
    handleUpdateGroupName
  }
}