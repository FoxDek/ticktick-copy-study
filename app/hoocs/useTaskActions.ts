import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback } from "react";

type Priority = 'common' | 'low' | 'medium' | 'high';

export function useTaskActions() {
  const addTask = useMutation(api.tasksFunctions.addTask);
  const updateTask = useMutation(api.tasksFunctions.updateTask);

  const handleTaskCheck = useCallback((taskId: Id<"tasks">, completed: boolean) => {
    console.log('handleTaskCheck called, taskId:', taskId, 'completed:', completed);
    updateTask({ taskId, patch: {completed} });
  }, [updateTask]);

  const handleTaskChangePriority = useCallback((taskId: Id<"tasks">, priority: Priority ) => {
    console.log('handleTaskChangePriority called, taskId:', taskId, 'priority:', priority);
    updateTask({ taskId, patch: {priority} });
  }, [updateTask]);

  const handleBodyChange = useCallback((taskId: Id<"tasks">, body: string ) => {
    console.log('handleBodyChange called, taskId:', taskId, 'body:', body);
    updateTask({ taskId, patch: {body} });
  }, [updateTask]);

  const handleDescriptionChange = useCallback((taskId: Id<"tasks">, description: string ) => {
    console.log('handleDescriptionChange called, taskId:', taskId, 'description:', description);
    updateTask({ taskId, patch: {description} });
  }, [updateTask]);

  const handleGroupChange = useCallback((taskId: Id<"tasks">, groupId: Id<"taskGroups"> | null) => {
    console.log('handleGroupChange called, taskId:', taskId, 'groupId:', groupId);
    updateTask({ taskId, patch: {groupId} });
  }, [updateTask]);

  const handleSubtasksCountChange = useCallback((taskId: Id<"tasks">, subtasksCount: number ) => {
    console.log('handleSubtasksCountChange called, taskId:', taskId, 'subtasksCount:', subtasksCount);
    updateTask({ taskId, patch: {subtasksCount} });
  }, [updateTask]);

  const handleDuplicateTask = useCallback(({body, groupId}: {body: string, groupId?: Id<"taskGroups"> | null}) => {
    console.log('handleDuplicateTask called, body:', body, 'groupId:', groupId);
    addTask({ body, groupId });
  }, [addTask])


  return {
    handleTaskCheck,
    handleTaskChangePriority,
    handleBodyChange,
    handleDescriptionChange,
    handleGroupChange,
    handleSubtasksCountChange,
    handleDuplicateTask
  }
}