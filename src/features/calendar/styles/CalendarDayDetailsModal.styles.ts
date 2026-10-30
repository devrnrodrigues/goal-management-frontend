import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: none;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  text-transform: capitalize;
  letter-spacing: -0.3px;
`;

export const ModalSubtitle = styled.span`
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 18px 18px 18px;
  overflow-y: auto;
  box-sizing: border-box;
  gap: 8px;
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: rgba(0, 0, 0, 0.12);
  }
`;

export const TaskTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TaskStatusIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StatusDot = styled.span<{ $status: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'completed':
        return theme.colors.primary;
      case 'in_progress':
        return theme.colors.statusWarning;
      case 'pending':
      default:
        return theme.colors.textMuted;
    }
  }};
`;

export const PriorityText = styled.span<{ $priority: string }>`
  font-size: 11px;
  font-weight: 500;
  color: ${({ $priority, theme }) => {
    switch ($priority) {
      case 'Alta':
        return theme.colors.statusDanger;
      case 'Média':
        return theme.colors.statusWarning;
      case 'Baixa':
      default:
        return theme.colors.textMuted;
    }
  }};
`;

export const TaskTitle = styled.h4`
  font-size: 13.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  line-height: 1.4;
  word-break: break-word;
`;

export const TaskMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  flex-wrap: wrap;
`;

export const MetaGoal = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  word-break: break-word;
`;

export const MetaDot = styled.span`
  opacity: 0.5;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  gap: 6px;
  text-align: center;
`;

export const EmptyText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;
