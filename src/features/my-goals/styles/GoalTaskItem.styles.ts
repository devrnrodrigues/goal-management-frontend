import styled from 'styled-components';

export const TaskItemCard = styled.div<{ $isSelected: boolean; $isCompleted: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.2s ease;
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 4px 14px rgba(0, 0, 0, 0.08)'
      : '0 2px 6px rgba(0, 0, 0, 0.03)'};
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
`;

export const TaskItemMainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const TaskItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const CustomCheckbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid
    ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#cbd5e1')};
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &::after {
    content: '✓';
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    display: ${({ $checked }) => ($checked ? 'block' : 'none')};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TaskTitleText = styled.span<{ $completed: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.textMuted : theme.colors.textPrimary};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  transition: color 0.2s ease;
`;

export const TaskDescriptionMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding-top: 6px;
`;

export const KanbanStatusBadge = styled.span<{ $status?: string }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  background-color: ${({ $status }) => {
    switch ($status) {
      case 'Concluído':
      case 'Concluída':
        return '#dcfce7';
      case 'Em Andamento':
      case 'Em andamento':
      case 'Em progresso':
        return '#fef3c7';
      case 'A Fazer':
      case 'A fazer':
        return '#dbeafe';
      default:
        return '#f1f5f9';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'Concluído':
      case 'Concluída':
        return '#16a34a';
      case 'Em Andamento':
      case 'Em andamento':
      case 'Em progresso':
        return '#d97706';
      case 'A Fazer':
      case 'A fazer':
        return '#2563eb';
      default:
        return '#475569';
    }
  }};
`;

export const DeadlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #94a3b8;
  font-weight: 500;

  svg {
    width: 13px;
    height: 13px;
    color: #94a3b8;
  }
`;

export const AvatarsGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberImg = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  margin-left: -6px;
  object-fit: cover;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  &:first-child {
    margin-left: 0;
  }
`;

export const TaskItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const IconButton = styled.button<{ $isDanger?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $isDanger, theme }) =>
      $isDanger ? theme.colors.statusDanger : theme.colors.primary};
    background: ${({ $isDanger }) => ($isDanger ? '#fee2e2' : '#f0fdf4')};
  }
`;

export const ExpandIconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

export const TaskDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 32px;
  padding-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
`;

export const TaskDescriptionMainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  flex-wrap: wrap;
`;

export const TaskDescriptionText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  flex: 1;
  min-width: 180px;
`;

export const TaskDescriptionRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: auto;
  flex-wrap: wrap;
`;

export const TaskDescriptionActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 6px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

