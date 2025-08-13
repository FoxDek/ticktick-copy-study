"use client";

import { useTaskActions } from "@/app/hoocs/useTaskActions";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";

export default function EditableTaskDescription({
  taskId,
  description,
}: {
  taskId: Id<"tasks">;
  description: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(description);
  const [debouncedValue, setDebouncedValue] = useState(description);

  const {handleDescriptionChange} = useTaskActions();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // inputRef.current.select(); // выделение текста
    }
  }, [isEditing]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (debouncedValue !== inputValue) {
        setDebouncedValue(inputValue);
        handleDescriptionChange(taskId, inputValue);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [inputValue, handleDescriptionChange, taskId, debouncedValue]);

  useEffect(() => {
    setInputValue(description);
    setDebouncedValue(description);
  }, [description]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      handleDescriptionChange(taskId, inputValue);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleDescriptionChange(taskId, inputValue);
  };

  if (!isEditing) {
    return (
      <div
        onClick={() => setIsEditing(true)}
        className='text-sm font-normal inline-block h-full w-full rounded-none border-none focus:outline-none cursor-text leading-[19px]'
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
      placeholder="Введите описание задачи"
      className='text-sm font-normal h-full w-full rounded-none border-none focus:outline-none leading-[19px] placeholder:opacity-0 focus:placeholder:opacity-100'
    />
  );
}
