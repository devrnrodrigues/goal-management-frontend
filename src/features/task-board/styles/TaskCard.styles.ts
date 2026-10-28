import styled from 'styled-components';
import type { TaskPriority } from '../types';

export const CardContainer = styled.div<{ $isDragging?: boolean }>`
  background-color: #ffffff;
  border-radius: 12px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02);
  padding: 16px 16px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: grab;
  user-select: none;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.35 : 1)};
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  &:active {
    cursor: grabbing;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const PriorityBadge = styled.span<{ $priority: TaskPriority }>`
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 6px;
  background-color: ${({ $priority }) => {
    switch ($priority) {
      case 'Alta':
        return '#fee2e2';
      case 'Média':
        return '#fef3c7';
      default:
        return '#dcfce7';
    }
  }};
  color: ${({ $priority }) => {
    switch ($priority) {
      case 'Alta':
        return '#ef4444';
      case 'Média':
        return '#d97706';
      default:
        return '#16a34a';
    }
  }};
`;

export const DeadlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;

  svg {
    width: 13.5px;
    height: 13.5px;
    color: #94a3b8;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CardTitle = styled.h4`
  font-size: 14.5px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  line-height: 1.4;
  text-decoration: none;
  word-break: break-word;
`;

export const CardDescription = styled.p`
  font-size: 12.5px;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
`;

export const AvatarsGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberImg = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-left: -7px;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

export const MemberInitialsBadge = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-left: -7px;
  background-color: rgba(0, 0, 0, 0.06);
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

export const AddMemberCircle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px dashed #cbd5e1;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -7px;
  color: #94a3b8;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    border-color: #94a3b8;
    color: #475569;
  }
`;

export const HoverActions = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const ActionBtn = styled.button`
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
    background-color: #f1f5f9;
    color: #1e293b;
  }

  &.delete-btn:hover {
    color: #ef4444;
    background-color: #fee2e2;
  }
`;
