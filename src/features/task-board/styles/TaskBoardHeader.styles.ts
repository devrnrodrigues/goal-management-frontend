import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 0;
  flex-wrap: wrap;
`;

export const BrandAndGoalGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ToolbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const OutlineBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ $active }) => ($active ? '#e0e7ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#4338ca' : '#475569')};
  border: 1px solid ${({ $active }) => ($active ? '#c7d2fe' : '#e2e8f0')};
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #1e293b;
  }

  svg {
    color: currentColor;
  }
`;

export const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 4px;
  z-index: 50;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FilterOption = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  background-color: ${({ $selected }) => ($selected ? '#f1f5f9' : 'transparent')};
  color: #1e293b;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f8fafc;
  }
`;
