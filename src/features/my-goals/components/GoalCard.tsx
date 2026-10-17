import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    Edit,
    Trash2,
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
    StatusBadgeCard,
    StatusIconWrapper,
    StatusBadgeTitle,
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
    CardBackActions,
    CardActionBtn,
    CardDescriptionContainer,
    CardDescriptionText,
    NoDescriptionText,
    TooltipContainer
} from '../styles/GoalCard.styles';

interface MemberAvatar {
    id: string;
    avatarUrl: string;
    name: string;
}

const defaultMembers: MemberAvatar[] = [
    { id: 'def-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    { id: 'def-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
    { id: 'def-3', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
];

const membersByTitle: Record<string, MemberAvatar[]> = {
    'Novo Checkout Transacional': [
        { id: 'v-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'v-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'v-3', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'v-4', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'v-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Design System Core v2': [
        { id: 'f-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'f-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'f-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'f-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Onboarding do Cliente': [
        { id: 'b-1', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'b-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'b-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Data Warehouse & BI': [
        { id: 'db-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'db-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Migração para Kubernetes': [
        { id: 'n-1', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'n-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'n-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'n-4', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'n-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'n-6', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
    ],
    'Automação E2E Mobile': [
        { id: 't-1', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Auditoria SOC 2 e LGPD': [
        { id: 's-1', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 's-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 's-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
    ],
    'Copiloto de Atendimento': [
        { id: 'c-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'c-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'c-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'c-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Motor de Faturamento Recorrente': [
        { id: 'm-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'm-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'm-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Otimização de Core Web Vitals': [
        { id: 'w-1', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'w-2', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Versionamento': [
        { id: 'v-1', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'v-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'v-3', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
        { id: 'v-4', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'v-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
    ],
    'Frontend': [
        { id: 'f-1', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'f-2', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
        { id: 'f-3', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'f-4', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
    ],
    'Backend': [
        { id: 'b-1', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'b-2', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'b-3', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
    ],
    'Banco de Dados': [
        { id: 'db-1', avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=80&q=80', name: 'Felipe Dias' },
        { id: 'db-2', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
    'Nuvem': [
        { id: 'n-1', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80', name: 'Julia Martins' },
        { id: 'n-2', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80', name: 'Marina Silva' },
        { id: 'n-3', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80', name: 'Gabriel Pires' },
        { id: 'n-4', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80', name: 'Lucas Costa' },
        { id: 'n-5', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80', name: 'Beatriz Rocha' },
        { id: 'n-6', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80', name: 'Rodrigo Alves' },
    ],
    'Testes': [
        { id: 't-1', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80', name: 'Camila Lima' },
    ],
};

interface GoalCardProps {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    status?: string;
    priority?: string;
    onEdit?: () => void;
    onDelete?: () => void;
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
    onEdit,
    onDelete
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [rotationY, setRotationY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isInfoHovered, setIsInfoHovered] = useState(false);

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
    const currentStatus = resolveKanbanStatus(title, progress, status);
    const currentPriority = resolvePriority(title, priority);
    const cardMembers = membersByTitle[title] || defaultMembers;
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
                            <CardBackActions>
                                <CardActionBtn
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit?.();
                                    }}
                                >
                                    <Edit size={20} />
                                </CardActionBtn>

                                <CardActionBtn
                                    type="button"
                                    $isDelete
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.();
                                    }}
                                >
                                    <Trash2 size={20} />
                                </CardActionBtn>
                            </CardBackActions>

                            <CardActionBtn
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    flip(false);
                                }}
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
                            <StatusBadgeCard $variant={getStatusVariant(currentStatus)}>
                                <StatusIconWrapper>
                                    {renderStatusIcon(currentStatus)}
                                </StatusIconWrapper>
                                <StatusBadgeTitle>{currentStatus}</StatusBadgeTitle>
                            </StatusBadgeCard>

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