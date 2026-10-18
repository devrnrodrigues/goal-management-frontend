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
}

const ROLE_OPTIONS: { id: MemberRole; label: string }[] = [
    { id: 'owner', label: 'Proprietário (Owner)' },
    { id: 'admin', label: 'Administrador (Admin)' },
    { id: 'viewer', label: 'Visualizador (Viewer)' }
];

export const RoleSelectDropdown: React.FC<RoleSelectDropdownProps> = ({
    value,
    onChange,
    ariaLabel
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

    const currentLabel = ROLE_OPTIONS.find((r) => r.id === value)?.label || value;

    return (
        <RoleDropdownContainer ref={containerRef} $isOpen={isOpen}>
            <RoleTriggerBtn
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={ariaLabel}
                aria-expanded={isOpen}
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
                        {ROLE_OPTIONS.map((option) => (
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
