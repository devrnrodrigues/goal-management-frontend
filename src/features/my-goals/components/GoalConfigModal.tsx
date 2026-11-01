import React, { useState, useEffect, useCallback, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { AnimatePresence } from 'framer-motion';
import {
    X,
    Settings,
    FileText,
    Users,
    Trash2,
    Calendar,
    Tag,
    AlertCircle,
    Activity,
    Plus,
    Search,
    User
} from 'lucide-react';
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalHeaderLeft,
    ModalHeaderIconWrapper,
    ModalTitleGroup,
    ModalTitle,
    ModalSubtitle,
    CloseButton,
    ModalTabs,
    ModalTabButton,
    ActiveTabIndicator,
    TabButtonText,
    TabBadge,
    ModalBody,
    TabContentPane,
    FormRow,
    FormGroup,
    Label,
    Input,
    Select,
    TextArea,
    DatePickerWrapper,
    SectionSubtitle,
    MembersSection,
    MemberList,
    MemberItemWrapper,
    MemberCard,
    MemberInfo,
    MemberAvatarImg,
    MemberAvatarInitials,
    MemberName,
    MemberControls,
    RemoveMemberBtn,
    OwnerBadge,
    MemberRemovePrompt,
    MemberRemoveInner,
    MemberRemoveText,
    MemberRemoveActions,
    SearchContainer,
    SearchInputWrapper,
    SearchInput,
    ClearSearchBtn,
    SearchResultsList,
    SearchResultCard,
    AddMemberBtn,
    EmptyNotice,
    ModalFooter,
    DangerActionBtn,
    DeletePromptWrapper,
    DeletePromptText,
    DeletePromptActions,
    FooterDefaultContent,
    ConfirmDeleteBtn,
    FooterActions,
    CancelBtn,
    SaveBtn
} from '../styles/GoalConfigModal.styles';
import { RoleSelectDropdown } from './RoleSelectDropdown';
import { useDevMode } from '../../shared/hooks/useDevMode';
import { getStoredUser } from '../../shared/api/httpClient';
import { usersApi } from '../../shared/api/usersApi';
import { getInitials } from '../../shared/utils/avatarUtils';
import { getGoalPermissions, appToast } from '../../shared';
import { type MemberAvatar, type MemberRole, systemUsers, currentUser } from '../constants/members';

export type { MemberAvatar, MemberRole };

export interface GoalConfigData {
    category: string;
    title: string;
    description: string;
    deadline?: string;
    status?: string;
    priority?: string;
    members?: MemberAvatar[];
    userRole?: string;
}

interface GoalConfigModalProps {
    isOpen: boolean;
    initialTab?: 'details' | 'members';
    highlightedMemberId?: string | null;
    onClose: () => void;
    goal: GoalConfigData;
    onSaveGoal: (updatedGoal: GoalConfigData) => void;
    onDeleteGoal: () => void;
}

const tabVariants = {
    enter: (dir: number) => ({
        x: dir >= 0 ? 30 : -30,
        opacity: 0
    }),
    center: {
        x: 0,
        opacity: 1
    },
    exit: (dir: number) => ({
        x: dir >= 0 ? -30 : 30,
        opacity: 0
    })
};

const SafeGoalConfigMemberAvatar: React.FC<{ name: string; avatarUrl?: string }> = ({ name, avatarUrl }) => {
    const [hasError, setHasError] = useState(false);

    if (avatarUrl && !hasError) {
        return (
            <MemberAvatarImg
                src={avatarUrl}
                alt={name}
                onError={() => setHasError(true)}
            />
        );
    }

    return <MemberAvatarInitials>{getInitials(name)}</MemberAvatarInitials>;
};

const getRoleLabel = (role?: MemberRole) => {
    switch (role) {
        case 'owner':
            return 'Proprietário';
        case 'admin':
            return 'Administrador';
        case 'viewer':
        default:
            return 'Visualizador';
    }
};

export const GoalConfigModal: React.FC<GoalConfigModalProps> = ({
    isOpen,
    initialTab = 'details',
    highlightedMemberId,
    onClose,
    goal,
    onSaveGoal,
    onDeleteGoal
}) => {
    const [activeTab, setActiveTab] = useState<'details' | 'members'>(initialTab);
    const [tabDirection, setTabDirection] = useState<number>(0);
    const [category, setCategory] = useState(goal.category || '');
    const [title, setTitle] = useState(goal.title || '');
    const [description, setDescription] = useState(goal.description || '');
    const [priority, setPriority] = useState(goal.priority || 'Média prioridade');
    const [status, setStatus] = useState(goal.status || 'Em progresso');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { isMock } = useDevMode();
    const [members, setMembers] = useState<MemberAvatar[]>([]);

    const storedUser = getStoredUser();
    const currentUserId = isMock ? currentUser.id : (storedUser?.id || '');
    const myMember = members.find(
        (m) => m.id === currentUserId || (Boolean(storedUser?.email) && m.email === storedUser?.email)
    );
    const effectiveRole = myMember?.role || goal.userRole || (isMock ? 'owner' : 'viewer');
    const permissions = getGoalPermissions(effectiveRole);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<MemberAvatar[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [memberToRemove, setMemberToRemove] = useState<MemberAvatar | null>(null);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');
    const modalBodyRef = useRef<HTMLDivElement>(null);
    const isSwitchingTabs = useRef(false);
    const switchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const contentRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null && isSwitchingTabs.current) {
            const measured = Math.ceil(node.getBoundingClientRect().height);
            if (measured > 0) {
                setContainerHeight(measured);
                if (switchTimeoutRef.current) {
                    clearTimeout(switchTimeoutRef.current);
                }
                switchTimeoutRef.current = setTimeout(() => {
                    setContainerHeight('auto');
                    isSwitchingTabs.current = false;
                }, 350);
            }
        }
    }, []);

    useEffect(() => {
        if (!isOpen) {
            if (switchTimeoutRef.current) {
                clearTimeout(switchTimeoutRef.current);
            }
            isSwitchingTabs.current = false;
            setContainerHeight('auto');
            return;
        }

        const handleWheel = (e: WheelEvent) => {
            const target = e.target as HTMLElement | null;
            if (modalBodyRef.current && modalBodyRef.current.contains(target)) {
                return;
            }
            e.preventDefault();
        };

        const handleTouchMove = (e: TouchEvent) => {
            const target = e.target as HTMLElement | null;
            if (modalBodyRef.current && modalBodyRef.current.contains(target)) {
                return;
            }
            e.preventDefault();
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isOpen]);

    useEffect(() => {
        setActiveTab(initialTab);
        setTabDirection(0);
        setCategory(goal.category || '');
        setTitle(goal.title || '');
        setDescription(goal.description || '');
        setPriority(goal.priority || 'Média prioridade');
        setStatus(goal.status || 'Em progresso');
        setSearchQuery('');
        setSearchedUsers([]);
        setIsSearching(false);
        setMemberToRemove(null);
        setIsConfirmingDelete(false);

        const storedUser = getStoredUser();

        let initialMembers: MemberAvatar[] = [];
        if (goal.members && goal.members.length > 0) {
            initialMembers = [...goal.members];
        } else if (isMock) {
            initialMembers = [currentUser];
        } else if (storedUser && storedUser.id) {
            initialMembers = [{
                id: storedUser.id,
                name: storedUser.name || 'Você',
                avatarUrl: storedUser.avatarUrl || '',
                role: 'owner',
                email: storedUser.email,
            }];
        }

        let ownerFound = false;
        const normalizedMembers = initialMembers.map((m) => {
            if (m.role === 'owner') {
                if (ownerFound) {
                    return { ...m, role: 'admin' as MemberRole };
                }
                ownerFound = true;
                return m;
            }
            return m;
        });

        if (!ownerFound && normalizedMembers.length > 0) {
            normalizedMembers[0] = { ...normalizedMembers[0], role: 'owner' };
        }

        setMembers(normalizedMembers);

        if (goal.deadline) {
            const parts = goal.deadline.split('/').map(Number);
            if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
                setSelectedDate(new Date(parts[2], parts[1] - 1, parts[0]));
            } else {
                setSelectedDate(null);
            }
        } else {
            setSelectedDate(null);
        }
    }, [goal, initialTab, isMock]);

    if (!isOpen) return null;

    const handleRemoveMember = (id: string) => {
        const target = members.find((m) => m.id === id);
        setMembers((prev) => prev.filter((m) => m.id !== id));
        if (target) {
            appToast.info(`Membro "${target.name}" removido da meta.`);
        }
    };

    const handleRoleChange = (memberId: string, newRole: MemberRole) => {
        setMembers((prev) => {
            const target = prev.find((m) => m.id === memberId);
            if (target?.role === 'owner') {
                return prev;
            }
            if (newRole === 'owner' && !permissions.isOwner) {
                return prev;
            }
            if (target) {
                appToast.info(`Papel de "${target.name}" alterado para ${getRoleLabel(newRole)}.`);
            }
            return prev.map((m) => {
                if (m.id === memberId) {
                    return { ...m, role: newRole };
                }
                if (newRole === 'owner' && m.role === 'owner') {
                    return { ...m, role: 'admin' };
                }
                return m;
            });
        });
    };

    const handleAddMember = (newMember: MemberAvatar) => {
        const isAlreadyMember = members.some(
            (m) => m.id === newMember.id || (Boolean(m.email) && Boolean(newMember.email) && m.email?.toLowerCase() === newMember.email?.toLowerCase())
        );
        if (!isAlreadyMember) {
            setMembers((prev) => [...prev, { ...newMember, role: newMember.role || 'viewer' }]);
            appToast.success(`Membro "${newMember.name}" adicionado à meta!`);
        }
    };

    useEffect(() => {
        if (isMock) {
            setSearchedUsers([]);
            return;
        }

        const trimmed = searchQuery.trim();
        if (!trimmed) {
            setSearchedUsers([]);
            setIsSearching(false);
            return;
        }

        let isCancelled = false;
        setIsSearching(true);

        const timer = setTimeout(async () => {
            try {
                const response = await usersApi.searchUsers(trimmed);
                if (!isCancelled) {
                    const mapped: MemberAvatar[] = response.content
                        .filter((u) => !members.some((m) => m.id === u.id || (m.email && m.email === u.email)))
                        .map((u) => ({
                            id: u.id,
                            name: u.name,
                            email: u.email,
                            avatarUrl: u.avatarUrl || '',
                            role: 'viewer' as MemberRole,
                        }));
                    setSearchedUsers(mapped);
                }
            } catch {
                if (!isCancelled) {
                    setSearchedUsers([]);
                }
            } finally {
                if (!isCancelled) {
                    setIsSearching(false);
                }
            }
        }, 250);

        return () => {
            isCancelled = true;
            clearTimeout(timer);
        };
    }, [searchQuery, isMock, members]);

    const filteredMembers = isMock
        ? (searchQuery.trim() === ''
            ? []
            : systemUsers
                .filter((dirMember) => !members.some((m) => m.id === dirMember.id || m.name === dirMember.name))
                .filter((m) => m.name.toLowerCase().includes(searchQuery.trim().toLowerCase())))
        : searchedUsers;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let formattedDeadline = goal.deadline;
        if (selectedDate) {
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            formattedDeadline = `${day}/${month}/${year}`;
        }

        onSaveGoal({
            category,
            title,
            description,
            deadline: formattedDeadline,
            status,
            priority,
            members
        });

        onClose();
    };

    const handleSwitchTab = (newTab: 'details' | 'members') => {
        if (newTab === activeTab) return;
        if (switchTimeoutRef.current) {
            clearTimeout(switchTimeoutRef.current);
        }
        if (modalBodyRef.current) {
            setContainerHeight(modalBodyRef.current.offsetHeight);
        }
        isSwitchingTabs.current = true;
        setTabDirection(newTab === 'members' ? 1 : -1);
        setActiveTab(newTab);
    };

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <ModalContainer
                initial={{ scale: 0.94, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
            >
                <ModalHeader>
                    <ModalHeaderLeft>
                        <ModalHeaderIconWrapper>
                            <Settings size={22} />
                        </ModalHeaderIconWrapper>
                        <ModalTitleGroup>
                            <ModalTitle>{permissions.canEditDetails ? 'Configurações da meta' : 'Detalhes da meta'}</ModalTitle>
                            <ModalSubtitle>{title || (permissions.canEditDetails ? 'Gerenciar informações e membros' : 'Visualizar informações e membros')}</ModalSubtitle>
                        </ModalTitleGroup>
                    </ModalHeaderLeft>

                    <CloseButton type="button" onClick={onClose} aria-label="Fechar">
                        <X size={18} />
                    </CloseButton>
                </ModalHeader>

                <ModalTabs>
                    <ModalTabButton
                        type="button"
                        $active={activeTab === 'details'}
                        onClick={() => handleSwitchTab('details')}
                    >
                        {activeTab === 'details' && (
                            <ActiveTabIndicator
                                layoutId="activeGoalConfigTab"
                                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                            />
                        )}
                        <TabButtonText>
                            <FileText size={16} />
                            {permissions.canEditDetails ? 'Editar dados' : 'Visualizar dados'}
                        </TabButtonText>
                    </ModalTabButton>

                    <ModalTabButton
                        type="button"
                        $active={activeTab === 'members'}
                        onClick={() => handleSwitchTab('members')}
                    >
                        {activeTab === 'members' && (
                            <ActiveTabIndicator
                                layoutId="activeGoalConfigTab"
                                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                            />
                        )}
                        <TabButtonText>
                            <Users size={16} />
                            {permissions.canAddMembers ? 'Gerenciar usuários' : 'Membros da meta'}
                            <TabBadge $active={activeTab === 'members'}>{members.length}</TabBadge>
                        </TabButtonText>
                    </ModalTabButton>
                </ModalTabs>

                <form onSubmit={handleSubmit}>
                    <ModalBody
                        ref={modalBodyRef}
                        initial={false}
                        $isAnimating={containerHeight !== 'auto'}
                        animate={{ height: containerHeight }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <AnimatePresence initial={false} mode="wait" custom={tabDirection}>
                            {activeTab === 'details' ? (
                                <TabContentPane
                                    key="details"
                                    ref={contentRef}
                                    custom={tabDirection}
                                    variants={tabVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                >
                                    <FormRow>
                                    <FormGroup>
                                        <Label>
                                            <Tag size={15} /> Categoria
                                        </Label>
                                        <Input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            placeholder="Categoria"
                                            required
                                            disabled={!permissions.canEditDetails}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            <Calendar size={15} /> Prazo final
                                        </Label>
                                        <DatePickerWrapper style={!permissions.canEditDetails ? { pointerEvents: 'none', opacity: 0.7 } : undefined}>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date: Date | null) => setSelectedDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                locale={ptBR}
                                                placeholderText="dd/mm/aaaa"
                                                disabled={!permissions.canEditDetails}
                                            />
                                        </DatePickerWrapper>
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <Label>
                                        <FileText size={15} /> Título da meta
                                    </Label>
                                    <Input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Título"
                                        required
                                        disabled={!permissions.canEditDetails}
                                    />
                                </FormGroup>

                                <FormRow>
                                    <FormGroup>
                                        <Label>
                                            <AlertCircle size={15} /> Prioridade
                                        </Label>
                                        <Select
                                            value={priority}
                                            onChange={(e) => setPriority(e.target.value)}
                                            disabled={!permissions.canEditDetails}
                                        >
                                            <option value="Alta prioridade">Alta prioridade</option>
                                            <option value="Média prioridade">Média prioridade</option>
                                            <option value="Baixa prioridade">Baixa prioridade</option>
                                        </Select>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            <Activity size={15} /> Status atual
                                        </Label>
                                        <Select
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                            disabled={!permissions.canEditDetails}
                                        >
                                            <option value="Planejamento">Planejamento</option>
                                            <option value="Em desenvolvimento">Em desenvolvimento</option>
                                            <option value="Em progresso">Em progresso</option>
                                            <option value="Homologação">Homologação</option>
                                            <option value="Revisão final">Revisão final</option>
                                            <option value="Prazo final">Prazo final</option>
                                            <option value="Concluído">Concluído</option>
                                        </Select>
                                    </FormGroup>
                                </FormRow>

                                <FormGroup>
                                    <Label>Descrição da meta</Label>
                                    <TextArea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Descrição"
                                        rows={3}
                                        disabled={!permissions.canEditDetails}
                                    />
                                </FormGroup>
                            </TabContentPane>
                        ) : (
                            <TabContentPane
                                key="members"
                                ref={contentRef}
                                custom={tabDirection}
                                variants={tabVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                            >
                                <MembersSection>
                                    <div>
                                    <SectionSubtitle>
                                        <Users size={16} /> Membros atribuídos ({members.length})
                                    </SectionSubtitle>
                                    {members.length === 0 ? (
                                        <EmptyNotice>Nenhum usuário atribuído a esta meta.</EmptyNotice>
                                    ) : (
                                        <MemberList>
                                            <AnimatePresence initial={false}>
                                                {members.map((member) => {
                                                    const storedUser = getStoredUser();
                                                    const currentUserId = isMock ? currentUser.id : (storedUser?.id || '');
                                                    const isSelf = member.id === currentUserId || (Boolean(storedUser?.email) && member.email === storedUser?.email);
                                                    const isOwner = member.role === 'owner';
                                                    const isHighlighted = member.id === highlightedMemberId || member.name === highlightedMemberId;
                                                    return (
                                                        <MemberItemWrapper
                                                            key={member.id}
                                                            ref={isHighlighted ? (el) => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) : undefined}
                                                            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                            transition={{ duration: 0.18, ease: 'easeOut' }}
                                                        >
                                                            <MemberCard $isHighlighted={isHighlighted}>
                                                                <MemberInfo>
                                                                    <SafeGoalConfigMemberAvatar
                                                                        name={member.name}
                                                                        avatarUrl={member.avatarUrl}
                                                                    />
                                                                    <MemberName>
                                                                        {member.name}{isSelf ? ' (Você)' : ''}
                                                                    </MemberName>
                                                                </MemberInfo>
                                                                <MemberControls>
                                                                    {permissions.canChangeRoles && !isOwner ? (
                                                                        <RoleSelectDropdown
                                                                            value={member.role || 'viewer'}
                                                                            onChange={(newRole) => handleRoleChange(member.id, newRole)}
                                                                            ariaLabel={`Permissão de ${member.name}`}
                                                                            canAssignOwner={permissions.isOwner}
                                                                        />
                                                                    ) : (
                                                                        <OwnerBadge>{getRoleLabel(member.role)}</OwnerBadge>
                                                                    )}

                                                                    {!isOwner && permissions.canRemoveMembers && (
                                                                        <RemoveMemberBtn
                                                                            type="button"
                                                                            onClick={() => setMemberToRemove(member)}
                                                                        >
                                                                            <User size={13} /> Remover
                                                                        </RemoveMemberBtn>
                                                                    )}
                                                                </MemberControls>
                                                            </MemberCard>

                                                            <AnimatePresence>
                                                                {memberToRemove?.id === member.id && (
                                                                    <MemberRemovePrompt
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{ duration: 0.18, ease: 'easeOut' }}
                                                                    >
                                                                        <MemberRemoveInner>
                                                                            <MemberRemoveText>
                                                                                Deseja realmente remover {member.name} desta meta?
                                                                            </MemberRemoveText>
                                                                            <MemberRemoveActions>
                                                                                <CancelBtn
                                                                                    type="button"
                                                                                    onClick={() => setMemberToRemove(null)}
                                                                                >
                                                                                    Cancelar
                                                                                </CancelBtn>
                                                                                <ConfirmDeleteBtn
                                                                                    type="button"
                                                                                    onClick={() => {
                                                                                        handleRemoveMember(member.id);
                                                                                        setMemberToRemove(null);
                                                                                    }}
                                                                                >
                                                                                    Confirmar
                                                                                </ConfirmDeleteBtn>
                                                                            </MemberRemoveActions>
                                                                        </MemberRemoveInner>
                                                                    </MemberRemovePrompt>
                                                                )}
                                                            </AnimatePresence>
                                                        </MemberItemWrapper>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </MemberList>
                                    )}
                                </div>

                                {permissions.canAddMembers && (
                                    <div>
                                        <SectionSubtitle>
                                            <Plus size={16} /> Adicionar membros
                                        </SectionSubtitle>

                                        <SearchContainer>
                                            <SearchInputWrapper>
                                                <Search size={14} className="search-icon" />
                                                <SearchInput
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Buscar"
                                                />
                                                {searchQuery && (
                                                    <ClearSearchBtn
                                                        type="button"
                                                        onClick={() => setSearchQuery('')}
                                                        aria-label="Limpar busca"
                                                    >
                                                        <X size={12} />
                                                    </ClearSearchBtn>
                                                )}
                                            </SearchInputWrapper>

                                            {searchQuery.trim().length > 0 && (
                                                isSearching ? (
                                                    <EmptyNotice>Buscando usuários...</EmptyNotice>
                                                ) : filteredMembers.length > 0 ? (
                                                    <SearchResultsList>
                                                        {filteredMembers.map((dirMember) => (
                                                            <SearchResultCard key={dirMember.id}>
                                                                <MemberInfo>
                                                                    <SafeGoalConfigMemberAvatar
                                                                        name={dirMember.name}
                                                                        avatarUrl={dirMember.avatarUrl}
                                                                    />
                                                                    <MemberName>{dirMember.name}</MemberName>
                                                                </MemberInfo>
                                                                <AddMemberBtn
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleAddMember(dirMember);
                                                                        setSearchQuery('');
                                                                    }}
                                                                >
                                                                    <Plus size={12} /> Adicionar
                                                                </AddMemberBtn>
                                                            </SearchResultCard>
                                                        ))}
                                                    </SearchResultsList>
                                                ) : (
                                                    <EmptyNotice>Nenhuma pessoa encontrada com esse nome.</EmptyNotice>
                                                )
                                            )}
                                        </SearchContainer>
                                    </div>
                                )}
                            </MembersSection>
                        </TabContentPane>
                    )}
                </AnimatePresence>
            </ModalBody>

            <ModalFooter>
                <AnimatePresence mode="wait">
                    {isConfirmingDelete ? (
                        <DeletePromptWrapper
                            key="delete-prompt"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16, ease: 'easeOut' }}
                        >
                            <DeletePromptText>
                                Tem certeza? Essa ação não poderá ser desfeita.
                            </DeletePromptText>
                            <DeletePromptActions>
                                <CancelBtn
                                    type="button"
                                    onClick={() => setIsConfirmingDelete(false)}
                                >
                                    Cancelar
                                </CancelBtn>
                                <ConfirmDeleteBtn
                                    type="button"
                                    onClick={() => {
                                        onDeleteGoal();
                                        onClose();
                                    }}
                                >
                                    <Trash2 size={13} /> Confirmar
                                </ConfirmDeleteBtn>
                            </DeletePromptActions>
                        </DeletePromptWrapper>
                    ) : (
                        <FooterDefaultContent
                            key="footer-default"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.16, ease: 'easeOut' }}
                        >
                            {permissions.canDeleteGoal && (
                                <DangerActionBtn
                                    type="button"
                                    onClick={() => setIsConfirmingDelete(true)}
                                >
                                    <Trash2 size={13} /> Excluir meta
                                </DangerActionBtn>
                            )}

                            <FooterActions style={!permissions.canDeleteGoal ? { marginLeft: 'auto' } : undefined}>
                                <CancelBtn type="button" onClick={onClose}>
                                    {permissions.canEditDetails ? 'Cancelar' : 'Fechar'}
                                </CancelBtn>
                                {permissions.canEditDetails && (
                                    <SaveBtn type="submit">
                                        Salvar alterações
                                    </SaveBtn>
                                )}
                            </FooterActions>
                        </FooterDefaultContent>
                    )}
                </AnimatePresence>
            </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};
