import React, { useState, useRef, useEffect } from 'react';
import { Target, ChevronDown, Search, Check, Plus } from 'lucide-react';
import type { Task } from '../../my-goals/types';
import type { ActiveGoalInfo } from '../types';
import {
  SelectorWrapper,
  GoalTriggerButton,
  GoalTitleTruncated,
  DropdownContainer,
  SearchInputWrapper,
  DropdownSearchInput,
  GoalsScrollList,
  GoalOptionItem,
  GoalOptionInfo,
  GoalOptionTitle,
  GoalOptionMeta,
  CustomGoalBadge,
} from '../styles/GoalSelector.styles';

interface GoalSelectorProps {
  availableGoals: Task[];
  activeGoal: ActiveGoalInfo;
  onSelectGoal: (goal: string | Task) => void;
}

export const GoalSelector: React.FC<GoalSelectorProps> = ({
  availableGoals,
  activeGoal,
  onSelectGoal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = availableGoals.filter((g) =>
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isExact = availableGoals.some(
    (g) => g.title.toLowerCase() === searchTerm.trim().toLowerCase()
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        const matched = availableGoals.find(
          (g) => g.title.toLowerCase() === searchTerm.trim().toLowerCase()
        );
        onSelectGoal(matched || searchTerm.trim());
        setIsOpen(false);
        setSearchTerm('');
      }
    }
  };

  const handleSelect = (goal: Task) => {
    onSelectGoal(goal);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSelectNew = () => {
    if (searchTerm.trim()) {
      onSelectGoal(searchTerm.trim());
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <SelectorWrapper ref={wrapperRef}>
      <GoalTriggerButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        title="Meta ativa"
      >
        <Target size={14} color="#00a86b" />
        <GoalTitleTruncated>{activeGoal.title}</GoalTitleTruncated>
        <ChevronDown size={14} />
      </GoalTriggerButton>

      {isOpen && (
        <DropdownContainer>
          <SearchInputWrapper>
            <Search size={14} />
            <DropdownSearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar meta"
              autoFocus
            />
          </SearchInputWrapper>

          <GoalsScrollList>
            {searchTerm.trim() !== '' && !isExact && (
              <GoalOptionItem type="button" onClick={handleSelectNew}>
                <GoalOptionInfo>
                  <GoalOptionTitle>Usar "{searchTerm.trim()}"</GoalOptionTitle>
                  <GoalOptionMeta>Nova meta personalizada</GoalOptionMeta>
                </GoalOptionInfo>
                <CustomGoalBadge>
                  <Plus size={10} /> Nova
                </CustomGoalBadge>
              </GoalOptionItem>
            )}

            {filtered.map((g) => {
              const isSelected = g.id === activeGoal.id || g.title === activeGoal.title;
              return (
                <GoalOptionItem
                  key={g.id || g.title}
                  type="button"
                  $isActive={isSelected}
                  onClick={() => handleSelect(g)}
                >
                  <GoalOptionInfo>
                    <GoalOptionTitle>{g.title}</GoalOptionTitle>
                    <GoalOptionMeta>
                      {g.category} • {g.subtasks?.length || 0} tarefas
                    </GoalOptionMeta>
                  </GoalOptionInfo>
                  {isSelected && <Check size={14} color="#00a86b" />}
                </GoalOptionItem>
              );
            })}
          </GoalsScrollList>
        </DropdownContainer>
      )}
    </SelectorWrapper>
  );
};
