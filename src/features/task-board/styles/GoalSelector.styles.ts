import styled from 'styled-components';

export const SelectorWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const GoalTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }

  svg {
    color: #64748b;
  }
`;

export const GoalTitleTruncated = styled.span`
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 320px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 10px;

  svg {
    color: #94a3b8;
    flex-shrink: 0;
  }
`;

export const DropdownSearchInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  font-size: 12px;
  color: #1e293b;
  outline: none;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const GoalsScrollList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 240px;
  overflow-y: auto;
  padding-right: 2px;
`;

export const GoalOptionItem = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? 'rgba(0, 168, 107, 0.08)' : 'transparent')};
  color: #1e293b;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 168, 107, 0.1);
  }
`;

export const GoalOptionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
`;

export const GoalOptionTitle = styled.span`
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GoalOptionMeta = styled.span`
  font-size: 11px;
  color: #64748b;
`;

export const CustomGoalBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: #00a86b;
  background-color: #e6f7f0;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
`;
