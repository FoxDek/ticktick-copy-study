import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback } from "react";


export function useUsersActions() {
  const updateUser = useMutation(api.usersFunctions.updateUser);

  const handleUpdateUserTheme = useCallback((theme: string) => {
    updateUser({ patch: { themeSettings: { theme } } });
  }, [updateUser]);

  const handleUpdateUserSidebars = useCallback((sidebars: 'all' | 'hide_note' | 'hide') => {
    updateUser({ patch: { themeSettings: { sidebars } } });
  }, [updateUser]);

  const handleUpdateUserCompletedStyle = useCallback((completedStyle: 'default' | 'strikethrough' ) => {
    updateUser({ patch: { themeSettings: { completedStyle } } });
  }, [updateUser]);

  return { handleUpdateUserTheme, handleUpdateUserSidebars, handleUpdateUserCompletedStyle };
}