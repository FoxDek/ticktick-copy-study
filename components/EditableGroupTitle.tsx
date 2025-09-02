"use client";

import { Id } from "@/convex/_generated/dataModel";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { useGroupsActions } from "@/app/hoocs/useGroupsActions";

const groupTitleBody = cva(
  "tasksTopTitle text-xl font-semibold  h-[28px] duration-100 ease-in-out px-1.5 rounded-md", // focus:outline-none
);

export default function EditableGroupTitle({
  customGroupId,
  body,
}: {
  customGroupId: Id<"taskGroups">;
  body: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(body);
  const [debouncedValue, setDebouncedValue] = useState(body);
  const [warningIsOpen, setWarningIsOpen] = useState(false);

  const {handleUpdateGroupName} = useGroupsActions();
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
        handleUpdateGroupName({groupId:customGroupId, name: inputValue});
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [inputValue, handleUpdateGroupName, customGroupId, debouncedValue]);

  useEffect(() => {
    setInputValue(body);
    setDebouncedValue(body);
  }, [body]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (inputValue === "") {
        setWarningIsOpen(true);
        return;
      }

      setIsEditing(false);
      handleUpdateGroupName({groupId:customGroupId, name: inputValue});
    }
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setWarningIsOpen(true);
      return;
    }
    setIsEditing(false);
    handleUpdateGroupName({groupId:customGroupId, name: inputValue});
  };

  if (!isEditing) {
    return (
      <h2
        onClick={() => setIsEditing(true)}
        className={groupTitleBody({className: 'hover:bg-gray-200'})}
      >
        {inputValue}
      </h2>
    );
  }

  return (
    <div className="">
      <input
        name='fullTaskBody'
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={groupTitleBody({className: 'outline-[#a596e0] outline'})}
      />

      {warningIsOpen &&<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl/20 bg-white py-2 px-4 rounded-md border border-gray-200 flex flex-col gap-2 items-center">
        <span className="italic text-sm">Название группы не может быть короче 1 символа</span>
        <button className="bg-[#a596e0] text-white px-4 py-1 rounded-md" onClick={() => setWarningIsOpen(false)}>Ок</button>
      </div>}
    </div>
  );
}
