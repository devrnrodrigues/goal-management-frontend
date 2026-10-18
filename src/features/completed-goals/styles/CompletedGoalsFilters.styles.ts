import styled from 'styled-components';

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 420px;
  min-width: 0;

  svg {
    position: absolute;
    left: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px 0 38px;
  font-size: 13.5px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const FiltersActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;

  svg {
    position: absolute;
    right: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 0;
  }
`;

export const SelectDropdown = styled.select`
  appearance: none;
  width: 100%;
  height: 40px;
  padding: 0 32px 0 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
