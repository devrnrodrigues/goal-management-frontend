import styled from 'styled-components';

export const QuickAddWrapper = styled.div<{ $isExpanded: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: none;
  border-radius: 14px;
  padding: ${({ $isExpanded }) => ($isExpanded ? '14px 16px' : '10px 14px')};
  transition: all 0.2s ease;
  box-shadow: ${({ $isExpanded }) =>
    $isExpanded ? '0 4px 16px rgba(0, 0, 0, 0.06)' : '0 2px 8px rgba(0, 0, 0, 0.02)'};
`;

export const QuickAddHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuickAddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const QuickAddInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const QuickAddExpandedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px dashed rgba(0, 0, 0, 0.06);
`;

export const QuickAddTextArea = styled.textarea`
  width: 100%;
  background: #eef2f0;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  resize: vertical;
  min-height: 50px;
  box-sizing: border-box;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const QuickAddActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const QuickAddSubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const QuickAddCancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;
