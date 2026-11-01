import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { type MemberRole } from '../constants/members';
import {
    RoleDropdownContainer,
    RoleTriggerBtn,
    RoleDropdownMenu,
    RoleDropdownItem
} from '../styles/GoalConfigModal.styles';

interface RoleSelectDropdownProps {
    value: MemberRole;
    onChange: (role: MemberRole) => void;
    ariaLabel?: string;
    disabled?: boolean;
    canAssignOwner?: boolean;
}

const ROLE_OPTIONS: { id: MemberRole; label: string }[] = [
    { id: 'owner', label: 'Proprietário (Owner)' },
    { id: 'admin', label: 'Administrador (Admin)' },
    { id: 'viewer', label: 'Visualizador (Viewer)' }
];

export const RoleSelectDropdown: React.FC<RoleSelectDropdownProps> = ({
    value,
    onChange,
    ariaLabel,
    disabled = false,
    canAssignOwner = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

    const availableOptions = canAssignOwner
        ? ROLE_OPTIONS
        : ROLE_OPTIONS.filter((option) => option.id !== 'owner');

    const currentLabel = ROLE_OPTIONS.find((r) => r.id === value)?.label || value;

    return (
        <RoleDropdownContainer ref={containerRef} $isOpen={isOpen} style={disabled ? { opacity: 0.7, pointerEvents: 'none' } : undefined}>
            <RoleTriggerBtn
                type="button"
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
                aria-label={ariaLabel}
                aria-expanded={isOpen}
                disabled={disabled}
            >
                <span>{currentLabel}</span>
                <ChevronDown size={12} className={isOpen ? 'open' : ''} />
            </RoleTriggerBtn>

            <AnimatePresence>
                {isOpen && (
                    <RoleDropdownMenu
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                        {availableOptions.map((option) => (
                            <RoleDropdownItem
                                key={option.id}
                                type="button"
                                $isSelected={option.id === value}
                                onClick={() => {
                                    onChange(option.id);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{option.label}</span>
                                {option.id === value && <Check size={12} />}
                            </RoleDropdownItem>
                        ))}
                    </RoleDropdownMenu>
                )}
            </AnimatePresence>
        </RoleDropdownContainer>
    );
};
