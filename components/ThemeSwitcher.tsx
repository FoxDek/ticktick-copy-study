'use client';

import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { useTheme } from './ThemeProvider';
import { useUsersActions } from '@/app/hoocs/useUsersActions';

const colorThemes = ['default', 'sky', 'turquoise', 'teal', 'green', 'apricot', 'peach', 'lilac', 'ebony', 'blue', 'gray', 'dark'];

interface ThemeSwitcherProps {
  initialPosition?: { x: number; y: number };
}

const containerVariants = cva(
  'bg-white p-2 rounded shadow-md cursor-move',
  {
    variants: {
      dragging: {
        true: 'opacity-80',
        false: '',
      },
    },
    defaultVariants: {
      dragging: false,
    },
  }
);

const selectVariants = cva(
  'border border-gray-300 rounded p-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 cursor-pointer',
  {
    variants: {},
  }
);

export function ThemeSwitcher({
  initialPosition = { x: 20, y: 20 },
}: ThemeSwitcherProps) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const { theme } = useTheme();
  const { handleUpdateUserTheme } = useUsersActions();
  const onThemeChange = (theme: string) => {
    handleUpdateUserTheme(theme);
  };

  const currentTheme = theme || 'default';

  const onMouseDown = (e: React.MouseEvent) => {
    // Only trigger drag if clicking outside the select element
    if (e.target instanceof HTMLSelectElement) return;
    if (e.button !== 0) return;
    setDragging(true);
    setRel({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e: MouseEvent) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
      }}
      className={containerVariants({ dragging })}
    >
      <select
        value={currentTheme}
        onChange={(e) => onThemeChange(e.target.value)}
        className={selectVariants()}
      >
        <option value="" disabled>
          Select Theme
        </option>
        {colorThemes.map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}