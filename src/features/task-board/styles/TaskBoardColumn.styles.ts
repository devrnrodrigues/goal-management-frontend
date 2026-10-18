import styled from 'styled-components';

export const ColumnWrapper = styled.div<{ $isDragging?: boolean; $isDragOver?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
  border-radius: 16px;
  width: 385px;
  min-width: 360px;
  max-width: 420px;
  max-height: calc(100vh - 240px);
  padding: 0 14px 14px 14px;
  flex-shrink: 0;
  border: 2px solid
    ${({ $isDragOver, theme }) =>
      $isDragOver ? theme.colors.primary : 'rgba(226, 232, 240, 0.6)'};
  opacity: ${({ $isDragging }) => ($isDragging ? 0.35 : 1)};
  transition: border-color 0.15s ease, opacity 0.15s ease;
  overflow: hidden;
`;

export const ColumnTopBar = styled.div<{ $color?: string }>`
  height: 4px;
  margin: 0 -14px 14px -14px;
  background-color: ${({ $color }) => $color || '#3b82f6'};
  flex-shrink: 0;
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 14px 4px;
`;

export const DragHandleBtn = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 4px;
  color: #94a3b8;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background-color: #e2e8f0;
    color: #1e293b;
  }

  &:active {
    cursor: grabbing;
  }
`;

export const ColumnTitleArea = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const ColumnTitleText = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.2px;
`;

export const TaskCountNumber = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
`;

export const ColumnActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const IconBtn = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  border-radius: 4px;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background-color: #e2e8f0;
    color: #1e293b;
  }
`;

export const ColumnMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  padding: 4px;
  z-index: 50;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ColumnMenuItem = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${({ $danger }) => ($danger ? '#ef4444' : '#334155')};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${({ $danger }) => ($danger ? '#fee2e2' : '#f1f5f9')};
  }
`;

export const CardsList = styled.div<{ $isDragOver?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  min-height: 120px;
  padding: 2px 2px;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
`;

export const EmptyNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 14px;
  color: #94a3b8;
  font-size: 13px;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const AddCardBottomButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 4px 4px 4px;
  margin-top: 6px;
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #0f172a;
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;
