import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
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
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  width: 100%;
  max-width: 620px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
`;

export const ModalTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
  word-break: break-word;
`;

export const ModalSubtitle = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 24px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

export const SubtasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SubtaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SubtaskLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;

  svg {
    color: ${({ theme }) => theme.colors.primaryDark};
    flex-shrink: 0;
  }
`;

export const SubtaskTitle = styled.span`
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  word-break: break-word;
`;

export const SubtaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const CompletionDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ResponsibleAvatar = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  box-sizing: border-box;
`;

export const PrimaryActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.textPrimary};
  color: ${({ theme }) => theme.colors.surface};
  border: none;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }
`;
