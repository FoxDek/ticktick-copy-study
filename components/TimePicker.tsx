import { cva } from 'class-variance-authority';
import React, { useState, useRef, useEffect } from 'react';
import SelectionIcon from '@/public/selection-icon.svg'

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

const iconContainerSmall = cva("iconContainer aspect-square flex items-center justify-center max-h-2 h-full w-auto group rounded-sm ml-2");

const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  className = ''
}) => {
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activeField, setActiveField] = useState<'hours' | 'minutes' | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Генерация списка времени от 00:00 до 23:30 с интервалом 30 минут
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = (i % 2) * 30;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      display: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    };
  });

  // Инициализация значений из props
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setHours(h || '');
      setMinutes(m || '');
    } else {
      setHours('');
      setMinutes('');
    }
  }, [value]);

  // Обработчик клика по контейнеру
  const handleContainerClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setActiveField('hours');
      setIsDropdownOpen(true);
      setTimeout(() => hoursRef.current?.focus(), 0);
    }
  };

  // Обработчик клика по полю часов
  const handleHoursClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveField('hours');
    hoursRef.current?.focus();
    setIsDropdownOpen(true);
  };

  // Обработчик клика по полю минут
  const handleMinutesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveField('minutes');
    minutesRef.current?.focus();
    setIsDropdownOpen(true);
  };

  // Обработчик изменения часов
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 2) value = value.slice(0, 2);
    
    setHours(value);
    
    // Автопереход к минутам после ввода 2 цифр
    if (value.length === 2) {
      setActiveField('minutes');
      setTimeout(() => minutesRef.current?.focus(), 10);
    }
  };

  // Обработчик изменения минут
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value.length > 2) value = value.slice(0, 2);
    setMinutes(value);
  };

  // Автоисправление и валидация при потере фокуса
  const handleBlur = () => {
    if (activeField === 'hours' && hours) {
      let h = parseInt(hours, 10);
      h = Math.min(23, Math.max(0, h));
      setHours(h.toString().padStart(2, '0'));
    }

    if (activeField === 'minutes' && minutes) {
      let m = parseInt(minutes, 10);
      
      // Автоисправление минут
      if (minutes.length === 1) {
        m = parseInt(minutes + '0', 10);
      }
      
      m = Math.min(59, Math.max(0, m));
      // Округляем до ближайших 30 минут
      m = Math.round(m / 30) * 30;
      if (m === 60) m = 0;
      
      setMinutes(m.toString().padStart(2, '0'));
    }

    // Сохраняем значение
    if (hours && minutes) {
      const time = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      if (onChange) onChange(time);
    }
  };

  // Обработчик выбора времени из dropdown
  const handleTimeSelect = (selectedHours: string, selectedMinutes: string) => {
    setHours(selectedHours);
    setMinutes(selectedMinutes);
    
    const time = `${selectedHours}:${selectedMinutes}`;
    if (onChange) onChange(time);
    
    setIsDropdownOpen(false);
    setIsEditing(false);
    setActiveField(null);
  };

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleBlur();
        setIsDropdownOpen(false);
        setIsEditing(false);
        setActiveField(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours, minutes, activeField]);

  // Обработчик клавиш
  const handleKeyDown = (e: React.KeyboardEvent, field: 'hours' | 'minutes') => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (field === 'hours') {
        setActiveField('minutes');
        minutesRef.current?.focus();
      } else {
        handleBlur();
        setIsDropdownOpen(false);
        setIsEditing(false);
        setActiveField(null);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setIsEditing(false);
      setActiveField(null);
    } else if (e.key === 'Enter') {
      handleBlur();
      setIsDropdownOpen(false);
      setIsEditing(false);
      setActiveField(null);
    }
  };

  return (
    <div className={`relative ${className} text-gray-400`}>
      {/* Поля ввода часов и минут */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className={`flex items-center rounded-md px-2 hover:bg-gray-200 cursor-text ${
          isEditing ? 'ring-2 ring-blue-500 border-transparent' : ''
        }`}
      >
        <input
          ref={hoursRef}
          type="text"
          value={hours}
          onChange={handleHoursChange}
          onClick={handleHoursClick}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, 'hours')}
          placeholder="00"
          className="w-4 text-center bg-transparent outline-none border-none"
          maxLength={2}
        />
        <span className="text-gray-500">:</span>
        <input
          ref={minutesRef}
          type="text"
          value={minutes}
          onChange={handleMinutesChange}
          onClick={handleMinutesClick}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, 'minutes')}
          placeholder="00"
          className="w-4 text-center bg-transparent outline-none border-none"
          maxLength={2}
        />
        <span className={iconContainerSmall()}>
          <SelectionIcon className="iconSvg w-full h-full fill-icons/60 text-white" />
        </span>
      </div>

      {/* Dropdown с вариантами времени */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-fit text-xs text-black mt-1 right-0 p-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto overflow-x-hidden">
          {timeOptions.map((time) => (
            <li
              key={time.display}
              onClick={() => handleTimeSelect(time.hours, time.minutes)}
              className={`px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100 min-w-30 ${
                hours === time.hours && minutes === time.minutes 
                  ? 'bg-blue-100 text-blue-800' 
                  : ''
              }`}
            >
              {time.display}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;