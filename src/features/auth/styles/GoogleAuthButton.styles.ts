import styled from 'styled-components';

export const StyledGoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 11px 16px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: #cbd5e1;
  }

  &:active {
    background-color: #f1f5f9;
  }
`;

export const GoogleIconSvg = styled.svg`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;
