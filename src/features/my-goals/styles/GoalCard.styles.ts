import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CardPerspectiveWrapper = styled(motion.div)`
    perspective: 1200px;
    transform-style: preserve-3d;
    width: 100%;
    height: 100%;
`;

export const CardContainer = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.surface};
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 350px;
    border-radius: 30px;
    padding: 34px 34px 26px 34px;
    color: ${({ theme }) => theme.colors.textPrimary};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: 1px solid ${({ theme }) => theme.colors.borderLight};
    overflow: hidden;
    position: relative;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    cursor: pointer;

    @media (min-width: 1720px) and (min-height: 900px) {
        height: clamp(360px, 33vh, 410px);
        padding: clamp(28px, 2.8vh, 36px) 34px 26px 34px;
    }

    @media (min-width: 2100px) and (min-height: 1000px) {
        height: clamp(380px, 35vh, 430px);
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    }
`;

export const TooltipContainer = styled(motion.div)<{ $x: number; $y: number }>`
    position: absolute;
    left: ${({ $x }) => $x + 15}px;
    top: ${({ $y }) => $y + 15}px;
    pointer-events: none;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.3px;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
`;

export const CardTopSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;

export const CardHeaderContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CardCategory = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.5px;
    text-transform: uppercase;
`;

export const CardTitle = styled.h3`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.4px;
    margin: 0;
`;

export const CardInfoIcon = styled.button`
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 4px;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        transform: scale(1.1);
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const ProgressContainer = styled.div`
    width: 100%;
    margin-bottom: 14px;
`;

export const ProgressTrack = styled.div`
    width: 100%;
    height: 16px;
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.full};
    overflow: hidden;
    position: relative;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    width: ${({ $progress }) => `${$progress}%`};
    min-width: ${({ $progress }) => ($progress > 0 ? '30px' : '0px')};
    transition: width 0.6s ease-out;
    border-radius: ${({ theme }) => theme.radii.full};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 6px;
    position: relative;
`;

export const ProgressTextInside = styled.span`
    font-size: 10px;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
    white-space: nowrap;
`;

export const CardBottomSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export type StatusVariant = 'planning' | 'in_progress' | 'development' | 'homologation' | 'qa' | 'review' | 'urgent' | 'done' | 'default';

export const StatusBadgeCard = styled.div<{ $variant?: StatusVariant }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border: none;
    border-radius: ${({ theme }) => theme.radii.md};
    margin-bottom: 14px;
    background-color: ${({ $variant }) => {
        switch ($variant) {
            case 'planning':
                return 'rgba(100, 116, 139, 0.08)';
            case 'development':
                return 'rgba(59, 130, 246, 0.08)';
            case 'in_progress':
                return 'rgba(6, 182, 212, 0.08)';
            case 'homologation':
                return 'rgba(147, 51, 234, 0.08)';
            case 'qa':
                return 'rgba(245, 158, 11, 0.08)';
            case 'review':
                return 'rgba(0, 168, 107, 0.08)';
            case 'urgent':
                return '#fee2e2';
            case 'done':
                return 'rgba(16, 185, 129, 0.08)';
            default:
                return 'rgba(0, 168, 107, 0.08)';
        }
    }};
`;

export const StatusIconWrapper = styled.div`
    width: 26px;
    height: 26px;
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111111;
    flex-shrink: 0;
`;

export const StatusBadgeTitle = styled.span`
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const CardDivider = styled.div`
    height: 1px;
    background-color: ${({ theme }) => theme.colors.borderLight};
    width: 100%;
    margin-bottom: 14px;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const CalendarBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;

    svg {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

export const PriorityBadge = styled.div<{ $priority?: string }>`
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ $priority, theme }) => {
        if ($priority === 'Alta prioridade') return theme.colors.statusDanger;
        if ($priority === 'Média prioridade') return theme.colors.statusWarning;
        if ($priority === 'Baixa prioridade') return theme.colors.primary;
        return theme.colors.textSecondary;
    }};

    svg {
        color: currentColor;
    }
`;

export const AvatarGroup = styled.div`
    display: flex;
    align-items: center;
`;

export const AvatarImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.surface};
    margin-left: -10px;
    object-fit: cover;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &:first-child {
        margin-left: 0;
    }
`;

export const AvatarMoreBadge = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.surface};
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    margin-left: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
`;

export const CardBackNav = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const CardBackActions = styled.div`
    display: flex;
    gap: 16px;
`;

export const CardActionBtn = styled.button<{ $isDelete?: boolean }>`
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: ${({ $isDelete, theme }) => ($isDelete ? theme.colors.statusDanger : theme.colors.primary)};
        transform: scale(1.1);
    }
`;

export const CardDescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto 0;
`;

export const CardDescriptionText = styled.p`
    font-size: 15px;
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0;
`;

export const NoDescriptionText = styled.span`
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
`;