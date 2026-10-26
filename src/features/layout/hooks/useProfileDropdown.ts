import { useState, useRef, useEffect } from 'react';
import { useDevMode } from '../../shared';

export const useProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDevMode, toggleDevMode } = useDevMode();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return {
    isOpen,
    isDevMode,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    toggleDevMode,
  };
};
