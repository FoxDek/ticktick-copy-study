"use client";

import { useTaskActions } from "@/app/hoocs/useTaskActions";
import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

const checkCardBody = cva(
  "h-full w-full py-2 transition-all duration-100 ease-in-out border-b border-transparent text-sm font-normal leading-[19px] rounded-none focus:outline-none",
);

export default function EditableCheckCardBody({
  taskId,
  completed,
  body,
  hasMultipleTasks,
}: {
  taskId: Id<"tasks">;
  completed: boolean;
  body: string;
  hasMultipleTasks: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(body);
  const [debouncedValue, setDebouncedValue] = useState(body);

  const {handleBodyChange} = useTaskActions();
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
        handleBodyChange(taskId, inputValue);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [inputValue, handleBodyChange, taskId, debouncedValue]);

  useEffect(() => {
    setInputValue(body);
    setDebouncedValue(body);
  }, [body]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      handleBodyChange(taskId, inputValue);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    handleBodyChange(taskId, inputValue);
  };

  if (!isEditing) {
    return (
      <span
        onClick={() => setIsEditing(true)}
        className={checkCardBody({
          className: `${completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${hasMultipleTasks ? "!border-gray-200" : ""}`,
        })}
      >
        {inputValue || "\u00A0"}
      </span>
    );
  }

  return (
    <input
      name='taskBody'
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={checkCardBody({
        className: `${completed ? "opacity-30 group-hover:opacity-40" : "opacity-100"} ${hasMultipleTasks ? "!border-gray-200" : ""}`,
      })}
    />
  );
}
