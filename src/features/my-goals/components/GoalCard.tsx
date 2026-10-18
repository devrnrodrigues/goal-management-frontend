import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    Settings,
    ArrowLeft,
    Info,
    Calendar,
    Compass,
    Activity,
    Wrench,
    ShieldCheck,
    CheckCircle2,
    Code2,
    AlertCircle,
    Flag,
    Clock
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
    StatusBadgeWrapper,
    StatusBadgePill,
    StatusBadgePillText,
    StatusBadgeFooterIcon,
    type StatusVariant,
    CardBottomSection,
    CardDivider,
    CardFooter,
    CalendarBadge,
    PriorityBadge,
    AvatarGroup,
    AvatarImage,
    AvatarMoreBadge,
    CardBackNav,
    CardActionBtn,
    CardDescriptionContainer,
    CardDescriptionText,
    NoDescriptionText,
    TooltipContainer
} from '../styles/GoalCard.styles';
import { defaultMembers, membersByTitle, type MemberAvatar } from '../constants/members';

interface GoalCardProps {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    status?: string;
    priority?: string;
    members?: MemberAvatar[];
    onOpenSettings?: () => void;
}

const statusMap: Record<string, string> = {
    'Novo Checkout Transacional': 'Revisão final',
    'Design System Core v2': 'Em desenvolvimento',
    'Migração para Kubernetes': 'Homologação',
    'Onboarding do Cliente': 'Em progresso',
    'Data Warehouse & BI': 'Planejamento',
    'Automação E2E Mobile': 'Prazo final',
    'Auditoria SOC 2 e LGPD': 'Revisão final',
    'Copiloto de Atendimento': 'Em desenvolvimento',
    'Motor de Faturamento Recorrente': 'Homologação',
    'Otimização de Core Web Vitals': 'Em progresso',
    'Versionamento': 'Revisão final',
    'Frontend': 'Em desenvolvimento',
    'Backend': 'Em progresso',
    'Banco de Dados': 'Planejamento',
    'Nuvem': 'Homologação',
    'Testes': 'Prazo final',
};

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

function renderPriorityIcon(priority: string) {
    switch (priority) {
        case 'Alta prioridade':
            return <AlertCircle size={14} />;
        case 'Média prioridade':
            return <Clock size={14} />;
        default:
            return <Flag size={14} />;
    }
}

function resolveKanbanStatus(title: string, progress: number, customStatus?: string): string {
    if (customStatus) {
        return customStatus;
    }
    if (statusMap[title]) {
        return statusMap[title];
    }
    if (progress === 0) {
        return 'Planejamento';
    }
    if (progress >= 100) {
        return 'Concluído';
    }
    if (progress >= 70) {
        return 'Revisão final';
    }
    if (progress >= 45) {
        return 'Homologação';
    }
    return 'Em progresso';
}

function renderStatusIcon(status: string) {
    switch (status) {
        case 'Prazo final':
        case 'Prazo Final':
            return <AlertCircle size={14} />;
        case 'Revisão final':
        case 'Revisão Final':
        case 'Em revisão':
            return <Wrench size={14} />;
        case 'Planejamento':
        case 'Não iniciado':
            return <Compass size={14} />;
        case 'Homologação':
        case 'Validação':
            return <ShieldCheck size={14} />;
        case 'Testes de QA':
        case 'Concluído':
            return <CheckCircle2 size={14} />;
        case 'Em desenvolvimento':
            return <Code2 size={14} />;
        default:
            return <Activity size={14} />;
    }
}

function getStatusVariant(status: string): StatusVariant {
    switch (status) {
        case 'Prazo final':
        case 'Prazo Final':
            return 'urgent';
        case 'Planejamento':
        case 'Não iniciado':
            return 'planning';
        case 'Em desenvolvimento':
            return 'development';
        case 'Em progresso':
            return 'in_progress';
        case 'Homologação':
            return 'homologation';
        case 'Testes de QA':
        case 'Validação':
            return 'qa';
        case 'Revisão final':
        case 'Revisão Final':
        case 'Em revisão':
            return 'review';
        case 'Concluído':
            return 'done';
        default:
            return 'default';
    }
}

export const GoalCard: React.FC<GoalCardProps> = ({
    category,
    title,
    progress,
    description,
    deadline,
    status,
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
    const [isStatusExpanded, setIsStatusExpanded] = useState(false);

    function flip(to: boolean) {
        if (isFlipping) return;
        if (!to) setIsStatusExpanded(false);
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
    const currentStatus = resolveKanbanStatus(title, progress, status);
    const currentPriority = resolvePriority(title, priority);
    const cardMembers = members && members.length > 0 ? members : (membersByTitle[title] || defaultMembers);
    const visibleMembers = cardMembers.slice(0, 3);
    const extraMembersCount = cardMembers.length - 3;
    const isLongStatus = currentStatus.length > 14;

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
                    {isHovered && !expanded && !isInfoHovered && (
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
                                    onOpenSettings?.();
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
                                    {renderPriorityIcon(currentPriority)}
                                    <span>{currentPriority}</span>
                                </PriorityBadge>

                                <StatusBadgeWrapper>
                                    <StatusBadgePill
                                        layout
                                        transition={{ layout: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } }}
                                        $variant={getStatusVariant(currentStatus)}
                                        $isLong={isLongStatus}
                                        onMouseEnter={() => {
                                            if (isLongStatus) setIsStatusExpanded(true);
                                        }}
                                        onMouseLeave={() => {
                                            if (isLongStatus) setIsStatusExpanded(false);
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (isLongStatus) setIsStatusExpanded((prev) => !prev);
                                        }}
                                        title={currentStatus}
                                    >
                                        <StatusBadgeFooterIcon>
                                            {renderStatusIcon(currentStatus)}
                                        </StatusBadgeFooterIcon>
                                        <StatusBadgePillText
                                            layout="position"
                                            $isLong={isLongStatus}
                                            $isExpanded={isStatusExpanded}
                                        >
                                            {currentStatus}
                                        </StatusBadgePillText>
                                    </StatusBadgePill>
                                </StatusBadgeWrapper>
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

                                <AvatarGroup>
                                    {visibleMembers.map((member) => (
                                        <AvatarImage
                                            key={member.id}
                                            src={member.avatarUrl}
                                            alt={member.name}
                                        />
                                    ))}
                                    {extraMembersCount > 0 && (
                                        <AvatarMoreBadge>+{extraMembersCount}</AvatarMoreBadge>
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