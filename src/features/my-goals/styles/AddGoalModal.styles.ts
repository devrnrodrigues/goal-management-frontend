import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
    overscroll-behavior: contain;
`;

export const ModalContainer = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    padding: 24px;
    border-radius: 16px;
    width: 100%;
    max-width: 560px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
    border: 1px solid ${({ theme }) => theme.colors.border};
    overflow: hidden;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
    padding-bottom: 14px;
`;

export const ModalHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ModalHeaderIconWrapper = styled.div`
    width: 36px;
    height: 36px;
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const ModalTitleGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ModalTitle = styled.h2`
    font-size: clamp(16px, 0.3vw + 15px, 18px);
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
    margin: 0;
    letter-spacing: -0.01em;
`;

export const ModalSubtitle = styled.p`
    font-size: clamp(12px, 0.1vw + 11px, 13px);
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 2px 0 0 0;
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: ${({ theme }) => theme.colors.textPrimary};
    }
`;

export const ModalTabs = styled.div`
    display: flex;
    gap: 6px;
    margin-bottom: 18px;
    background-color: rgba(15, 23, 42, 0.03);
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    padding: 3px;
    border-radius: ${({ theme }) => theme.radii.sm};
`;

export const ModalTabButton = styled.button<{ $active?: boolean }>`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 12px;
    border-radius: 6px;
    border: none;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.15s ease;
    background-color: transparent;
    color: ${({ $active, theme }) => ($active ? theme.colors.textPrimary : theme.colors.textSecondary)};

    &:hover {
        color: ${({ theme }) => theme.colors.textPrimary};
    }
`;

export const ActiveTabIndicator = styled(motion.div)`
    position: absolute;
    inset: 0;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    z-index: 1;
`;

export const TabButtonText = styled.span`
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const TabBadge = styled.span<{ $active?: boolean }>`
    background-color: ${({ $active }) => ($active ? '#0f172a' : 'rgba(100, 116, 139, 0.12)')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#64748b')};
    font-size: 11px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: ${({ theme }) => theme.radii.full};
`;

export const ModalBody = styled(motion.div)<{ $isAnimating?: boolean }>`
    overflow-y: ${({ $isAnimating }) => ($isAnimating ? 'hidden' : 'auto')};
    overflow-x: hidden;
    max-height: 52vh;
    padding-right: 4px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    scrollbar-width: thin;
    overscroll-behavior: contain;
`;

export const TabContentPane = styled(motion.div)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const Label = styled.label`
    font-size: clamp(12px, 0.1vw + 11px, 13px);
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surface};
    transition: all 0.15s ease;

    &:focus {
        outline: none;
        border-color: #64748b;
        box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.12);
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surface};
    cursor: pointer;
    transition: all 0.15s ease;

    &:focus {
        outline: none;
        border-color: #64748b;
        box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.12);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 8px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surface};
    resize: vertical;
    min-height: 70px;
    font-family: inherit;
    transition: all 0.15s ease;

    &:focus {
        outline: none;
        border-color: #64748b;
        box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.12);
    }
`;

export const DatePickerWrapper = styled.div`
    width: 100%;

    .react-datepicker-wrapper {
        width: 100%;
    }

    .react-datepicker__input-container input {
        width: 100%;
        padding: 8px 12px;
        border-radius: ${({ theme }) => theme.radii.sm};
        border: 1px solid ${({ theme }) => theme.colors.border};
        font-size: 13px;
        color: ${({ theme }) => theme.colors.textPrimary};
        background-color: ${({ theme }) => theme.colors.surface};
        transition: all 0.15s ease;

        &:focus {
            outline: none;
            border-color: #64748b;
            box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.12);
        }
    }
`;

export const SectionSubtitle = styled.h3`
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

export const MembersSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MemberList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const MemberItemWrapper = styled(motion.div)`
    display: flex;
    flex-direction: column;
`;

export const MemberCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 10px;
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    transition: all 0.15s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.border};
        background-color: rgba(15, 23, 42, 0.02);
    }
`;

export const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const MemberAvatarImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const MemberAvatarInitials = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.06);
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
`;

export const MemberName = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textPrimary};
`;

export const MemberControls = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const RemoveMemberBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid transparent;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.statusDanger};
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background-color: #fee2e2;
    }
`;

export const OwnerBadge = styled.span`
    font-size: 11px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 3px 6px;
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: rgba(100, 116, 139, 0.08);
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const SearchInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    svg.search-icon {
        position: absolute;
        left: 11px;
        color: ${({ theme }) => theme.colors.textSecondary};
        pointer-events: none;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 8px 30px 8px 34px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.surface};
    transition: all 0.15s ease;

    &:focus {
        outline: none;
        border-color: #64748b;
        box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.12);
    }
`;

export const ClearSearchBtn = styled.button`
    position: absolute;
    right: 8px;
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.textPrimary};
        background: rgba(0, 0, 0, 0.05);
    }
`;

export const SearchResultsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 180px;
    overflow-y: auto;
    padding-right: 2px;
`;

export const SearchResultCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    background-color: ${({ theme }) => theme.colors.surface};
    transition: all 0.15s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.border};
        background-color: rgba(15, 23, 42, 0.02);
    }
`;

export const AddMemberBtn = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 3px 8px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background-color: #0f172a;
        color: #ffffff;
        border-color: #0f172a;
    }
`;

export const EmptyNotice = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 4px 0;
    font-style: italic;
`;

export const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
    gap: 8px;
    min-height: 48px;
`;

export const CancelButton = styled.button`
    padding: 7px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.04);
        color: ${({ theme }) => theme.colors.textPrimary};
    }
`;

export const SubmitButton = styled.button`
    padding: 7px 18px;
    border-radius: ${({ theme }) => theme.radii.sm};
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover};
    }
`;
