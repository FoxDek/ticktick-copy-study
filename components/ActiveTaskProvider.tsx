'use client';

import { createContext, useContext, useState, ReactNode } from "react";
import { Id } from "@/convex/_generated/dataModel";

const ActiveTaskContext = createContext<{
  activeTaskId: Id<'tasks'> | null;
  setActiveTaskId: (id: Id<'tasks'> | null) => void;
} | undefined>(undefined);

export function ActiveTaskProvider({ children }: { children: ReactNode }) {
  const [activeTaskId, setActiveTaskId] = useState<Id<'tasks'> | null>(null);

  return (
    <ActiveTaskContext.Provider value={{ activeTaskId, setActiveTaskId }}>
      {children}
    </ActiveTaskContext.Provider>
  );
}

export function useActiveTask() {
  const context = useContext(ActiveTaskContext);
  if (!context) {
    throw new Error("useActiveTask must be used within an ActiveTaskProvider");
  }
  return context;
}
