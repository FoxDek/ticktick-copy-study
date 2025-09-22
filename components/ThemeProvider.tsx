"use client";
import { userThemeDefaultSettings } from "@/app/constants/settings-data";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { createContext, useContext } from "react";

const ThemeContext = createContext({
  theme: "default",
  sidebars: "all",
  completedStyle: "default",
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const userData = useQuery(api.usersFunctions.currentUser);
  const userTheme = userData?.themeSettings
  const theme = userTheme?.theme || userThemeDefaultSettings.theme;
  const sidebars = userTheme?.sidebars || userThemeDefaultSettings.sidebars;
  const completedStyle = userTheme?.completedStyle || userThemeDefaultSettings.completedStyle;

  return (
    <ThemeContext.Provider value={{ theme, sidebars, completedStyle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
