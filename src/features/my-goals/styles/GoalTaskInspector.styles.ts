import styled from 'styled-components';

export const InspectorContainer = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 20px;
  padding: 22px 24px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: fit-content;
  position: sticky;
  top: 24px;
  box-sizing: border-box;

  @media (max-width: 960px) {
    position: static;
  }
`;

export const InspectorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

export const InspectorTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InspectorHeading = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const StatusIndicator = styled.span<{ $completed: boolean }>`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${({ $completed }) => ($completed ? '#f0fdf4' : '#fffbeb')};
  color: ${({ $completed }) => ($completed ? '#15803d' : '#b45309')};
  border: none;
`;

export const CloseInspectorButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FormLabel = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const FormInput = styled.input`
  background: #eef2f0;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const FormTextArea = styled.textarea`
  background: #eef2f0;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  resize: vertical;
  min-height: 110px;
  line-height: 1.5;
  transition: all 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const InspectorActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

export const SaveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    box-shadow: 0 4px 12px rgba(0, 168, 107, 0.25);
  }
`;

export const SecondaryActionButton = styled.button<{ $isDanger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${({ $isDanger }) => ($isDanger ? '#fee2e2' : '#eef2f0')};
  color: ${({ $isDanger, theme }) =>
    $isDanger ? theme.colors.statusDanger : theme.colors.textSecondary};
  border: none;
  padding: 9px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $isDanger }) => ($isDanger ? '#fecaca' : '#e2e8e5')};
    color: ${({ $isDanger, theme }) =>
      $isDanger ? theme.colors.statusDanger : theme.colors.textPrimary};
  }
`;

export const EmptyInspectorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 12px;
  gap: 12px;
`;

export const EmptyInspectorIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyInspectorTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const EmptyInspectorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

export const QuickMetricCardsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  margin-top: 8px;
`;

export const QuickMetricCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const QuickMetricValue = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export const QuickMetricLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
`;
