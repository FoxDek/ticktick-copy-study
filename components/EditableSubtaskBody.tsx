"use client";

import { useSubtasksActions } from "@/app/hoocs/useSubtasksActions";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";

interface EditableSubtaskBodyProps {
  subtaskId: Id<"subtasks">;
  body: string;
  completed: boolean;
  listDescToggler: string;
  handleAddSubtask: () => void;
  autoEditId: boolean;
  subtaskCount: number;
  onFocusChange?: () => void;
  handleBackspaceDelete: (subtaskId: Id<"subtasks">) => void;
}

export default function EditableSubtaskBody({
  subtaskId,
  body,
  completed,
  listDescToggler,
  handleAddSubtask,
  autoEditId,
  subtaskCount,
  onFocusChange,
  handleBackspaceDelete
}: EditableSubtaskBodyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(body);
  const [debouncedValue, setDebouncedValue] = useState(body);

  const {handleSubtaskBodyChange} = useSubtasksActions();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoEditId) {
      setIsEditing(true);
    }
  }, [autoEditId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, subtaskId, onFocusChange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncedValue !== inputValue) {
        setDebouncedValue(inputValue);
        handleSubtaskBodyChange(subtaskId, inputValue);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [inputValue, handleSubtaskBodyChange, subtaskId, debouncedValue]);

  useEffect(() => {
    setInputValue(body);
    setDebouncedValue(body);
  }, [body]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (subtaskCount >= 5) {
        setIsEditing(false);
        return;
      };

      setIsEditing(false);
      handleSubtaskBodyChange(subtaskId, inputValue);
      handleAddSubtask();
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      setIsEditing(false);
      handleBackspaceDelete(subtaskId);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleSubtaskBodyChange(subtaskId, inputValue);
  };

  if (!isEditing) {
    return (
      <div
        onClick={() => {
          setIsEditing(true);
          onFocusChange?.();
        }}
        className={`text-sm font-normal inline-block h-full w-full rounded-none border-none focus:outline-none cursor-text leading-[19px] ${completed && listDescToggler === "list" ? "opacity-30 group-hover:opacity-40" : "opacity-100"}`}
      >
        {inputValue || "\u00A0"}
      </div>
    );
  }

  return (
    <input
      name='fullTaskBody'
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      placeholder="Подзадача"
      className='text-sm font-normal h-full w-full rounded-none border-none focus:outline-none leading-[19px] placeholder:opacity-0 focus:placeholder:opacity-100'
    />
  );
}
