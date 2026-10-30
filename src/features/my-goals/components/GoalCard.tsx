import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    Settings,
    ArrowLeft,
    Info,
    Calendar
} from 'lucide-react';
import {
    CardPerspectiveWrapper,
    CardContainer,
    CardTopSection,
    CardHeader,
    CardHeaderContent,
    CardInfoIcon,
    CardCategory,
    CardTitle,
    ProgressContainer,
    ProgressTrack,
    ProgressBar,
    ProgressTextInside,
    CardBottomSection,
    CardDivider,
    CardFooter,
    CalendarBadge,
    PriorityBadge,
    AvatarGroup,
    AvatarImage,
    AvatarInitialsBadge,
    AvatarMoreBadge,
    CardBackNav,
    CardActionBtn,
    CardDescriptionContainer,
    CardDescriptionText,
    NoDescriptionText,
    TooltipContainer
} from '../styles/GoalCard.styles';
import { useDevMode } from '../../shared/hooks/useDevMode';
import { getInitials } from '../../shared/utils/avatarUtils';
import { type MemberAvatar, membersByTitle, defaultMembers } from '../constants/members';

interface GoalCardProps {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    status?: string;
    priority?: string;
    members?: MemberAvatar[];
    onOpenSettings?: (tab?: 'details' | 'members', memberId?: string) => void;
}



const priorityMap: Record<string, string> = {
    'Novo Checkout Transacional': 'Alta prioridade',
    'Design System Core v2': 'Média prioridade',
    'Migração para Kubernetes': 'Alta prioridade',
    'Onboarding do Cliente': 'Média prioridade',
    'Data Warehouse & BI': 'Baixa prioridade',
    'Automação E2E Mobile': 'Alta prioridade',
    'Auditoria SOC 2 e LGPD': 'Alta prioridade',
    'Copiloto de Atendimento': 'Média prioridade',
    'Motor de Faturamento Recorrente': 'Alta prioridade',
    'Otimização de Core Web Vitals': 'Média prioridade',
    'Versionamento': 'Alta prioridade',
    'Frontend': 'Alta prioridade',
    'Backend': 'Média prioridade',
    'Banco de Dados': 'Baixa prioridade',
    'Nuvem': 'Média prioridade',
    'Testes': 'Alta prioridade',
};

function resolvePriority(title: string, customPriority?: string): string {
    if (customPriority) {
        return customPriority;
    }
    return priorityMap[title] || 'Média prioridade';
}



const SafeGoalCardAvatar: React.FC<{
    member: MemberAvatar;
    onClick?: (e: React.MouseEvent) => void;
}> = ({ member, onClick }) => {
    const [hasError, setHasError] = useState(false);

    if (member.avatarUrl && !hasError) {
        return (
            <AvatarImage
                src={member.avatarUrl}
                alt={member.name}
                title={member.name}
                onClick={onClick}
                onError={() => setHasError(true)}
            />
        );
    }

    return (
        <AvatarInitialsBadge title={member.name} onClick={onClick}>
            {getInitials(member.name)}
        </AvatarInitialsBadge>
    );
};

export const GoalCard: React.FC<GoalCardProps> = ({
    category,
    title,
    progress,
    description,
    deadline,
    priority,
    members,
    onOpenSettings,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [rotationY, setRotationY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isInfoHovered, setIsInfoHovered] = useState(false);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);

    function flip(to: boolean) {
        if (isFlipping) return;
        setIsFlipping(true);
        setRotationY((prev) => (to ? prev + 360 : prev - 360));
        setTimeout(() => {
            setExpanded(to);
        }, 280);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const hasDescription = Boolean(description && description.trim() !== '');
    const currentPriority = resolvePriority(title, priority);
    const { isMock } = useDevMode();
    const cardMembers = members && members.length > 0
        ? members
        : (isMock ? (membersByTitle[title] || defaultMembers) : []);
    const visibleMembers = cardMembers.slice(0, 3);
    const extraMembersCount = cardMembers.length - 3;

    return (
        <CardPerspectiveWrapper
            animate={{
                rotateY: rotationY,
                scale: isFlipping ? [1, 1.03, 1] : 1,
            }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            }}
            onAnimationComplete={() => setIsFlipping(false)}
        >
            <CardContainer
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && !expanded && !isInfoHovered && !isAvatarHovered && (
                        <TooltipContainer
                            $x={mousePosition.x}
                            $y={mousePosition.y}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                        >
                            Abrir meta
                        </TooltipContainer>
                    )}
                </AnimatePresence>

                {expanded ? (
                    <>
                        <CardBackNav>
                            <CardActionBtn
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenSettings?.('details');
                                }}
                                title="Configurações da meta"
                                aria-label="Configurações da meta"
                            >
                                <Settings size={22} />
                            </CardActionBtn>

                            <CardActionBtn
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    flip(false);
                                }}
                                title="Voltar"
                                aria-label="Voltar"
                            >
                                <ArrowLeft size={24} />
                            </CardActionBtn>
                        </CardBackNav>

                        <CardDescriptionContainer>
                            {hasDescription ? (
                                <CardDescriptionText>
                                    {description}
                                </CardDescriptionText>
                            ) : (
                                <NoDescriptionText>Não há descrição cadastrada.</NoDescriptionText>
                            )}
                        </CardDescriptionContainer>

                        <CardBottomSection>
                            <CardDivider />
                            <CardFooter>
                                <PriorityBadge $priority={currentPriority}>
                                    {currentPriority}
                                </PriorityBadge>
                            </CardFooter>
                        </CardBottomSection>
                    </>
                ) : (
                    <>
                        <CardTopSection>
                            <CardHeader>
                                <CardHeaderContent>
                                    <CardCategory>{category}</CardCategory>
                                    <CardTitle>{title}</CardTitle>
                                </CardHeaderContent>
                                <CardInfoIcon
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        flip(true);
                                    }}
                                    onMouseEnter={() => setIsInfoHovered(true)}
                                    onMouseLeave={() => setIsInfoHovered(false)}
                                >
                                    <Info size={22} />
                                </CardInfoIcon>
                            </CardHeader>
                        </CardTopSection>

                        <CardBottomSection>
                            <ProgressContainer>
                                <ProgressTrack>
                                    <ProgressBar $progress={progress}>
                                        <ProgressTextInside>{progress}%</ProgressTextInside>
                                    </ProgressBar>
                                </ProgressTrack>
                            </ProgressContainer>

                            <CardDivider />

                            <CardFooter>
                                <CalendarBadge>
                                    <Calendar size={15} />
                                    <span>{deadline ? `Prazo: ${deadline}` : 'Sem prazo'}</span>
                                </CalendarBadge>

                                <AvatarGroup
                                    role="button"
                                    tabIndex={0}
                                    title="Gerenciar usuários"
                                    aria-label="Gerenciar usuários"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenSettings?.('members');
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onOpenSettings?.('members');
                                        }
                                    }}
                                    onMouseEnter={() => setIsAvatarHovered(true)}
                                    onMouseLeave={() => setIsAvatarHovered(false)}
                                >
                                    {visibleMembers.map((member) => (
                                        <SafeGoalCardAvatar
                                            key={member.id}
                                            member={member}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenSettings?.('members', member.id);
                                            }}
                                        />
                                    ))}
                                    {extraMembersCount > 0 && (
                                        <AvatarMoreBadge
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenSettings?.('members');
                                            }}
                                        >
                                            +{extraMembersCount}
                                        </AvatarMoreBadge>
                                    )}
                                </AvatarGroup>
                            </CardFooter>
                        </CardBottomSection>
                    </>
                )}
            </CardContainer>
        </CardPerspectiveWrapper>
    );
};