import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback } from "react";

export function useSubtasksActions() {
  const updateSubtask = useMutation(api.subtasksFunctions.updateSubtask)
  const deleteSubtask = useMutation(api.subtasksFunctions.deleteSubtask)
  const updateTask = useMutation(api.tasksFunctions.updateTask)

  const handleSubtaskBodyChange = useCallback((subtaskId: Id<"subtasks">, body: string ) => {
    console.log('handleSubtaskBodyChange called, subtaskId:', subtaskId, 'body:', body);
    updateSubtask({ subtaskId, patch: {body} });
  }, [updateSubtask]);

  const handleSubtaskCheck = useCallback((subtaskId: Id<"subtasks">, completed: boolean ) => {
    console.log('handleSubtaskCheck called, subtaskId:', subtaskId, 'completed:', completed);
    updateSubtask({ subtaskId, patch: {completed} });
  }, [updateSubtask]);

  const handleSubtaskDelete = useCallback((subtaskId: Id<"subtasks">, taskId: Id<"tasks">, subtaskCount: number) => {
    console.log('handleSubtaskDelete called, subtaskId:', subtaskId);
    deleteSubtask({ subtaskId });
    updateTask({ taskId: taskId, patch: {subtasksCount: subtaskCount - 1} });
  }, [deleteSubtask, updateTask]);

  return {
    handleSubtaskBodyChange,
    handleSubtaskCheck,
    handleSubtaskDelete
  }
}