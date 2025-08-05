// lib/SidebarContext.tsx
'use client';

import { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}