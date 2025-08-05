import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

type Priority = 'common' | 'low' | 'medium' | 'high';

export function useTaskActions() {
  const updateTask = useMutation(api.tasksFunctions.updateTask);

  const handleTaskCheck = (taskId: Id<"tasks">, completed: boolean) => {
    console.log('handleTaskCheck called, taskId:', taskId, 'completed:', completed);
    updateTask({ taskId, patch: {completed} });
  };

  const handleTaskChangePriority = (taskId: Id<"tasks">, priority: Priority ) => {
    console.log('handleTaskCheck called, taskId:', taskId, 'priority:', priority);
    updateTask({ taskId, patch: {priority} });
  };

  return {
    handleTaskCheck,
    handleTaskChangePriority
  }
}