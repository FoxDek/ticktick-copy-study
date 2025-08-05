import { ReactNode } from "react";

interface IconButtonProps {
  children: ReactNode;
  onClick: () => void; // Функция без параметров, возвращает void
  addClasses?: string;
}

export default function IconButton({ children, onClick, addClasses = '' }: IconButtonProps) {
  return (
    <button
      className={`iconButton aspect-square flex items-center justify-center max-h-7 h-full w-auto group p-1.5 hover:bg-gray-100 rounded-sm cursor-pointer duration-100 ease-in-out ${addClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
