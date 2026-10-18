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
    const [members, setMembers] = useState<MemberAvatar[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
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
        setMemberToRemove(null);
        setIsConfirmingDelete(false);

        const initialMembers = goal.members && goal.members.length > 0
            ? [...goal.members]
            : [currentUser];

        const hasCurrentUser = initialMembers.some((m) => m.id === currentUser.id);
        const mergedMembers = hasCurrentUser ? initialMembers : [currentUser, ...initialMembers];

        let ownerFound = false;
        const normalizedMembers = mergedMembers.map((m) => {
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
    }, [goal, initialTab]);

    if (!isOpen) return null;

    const handleRemoveMember = (id: string) => {
        setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const handleRoleChange = (memberId: string, newRole: MemberRole) => {
        setMembers((prev) =>
            prev.map((m) => {
                if (m.id === memberId) {
                    return { ...m, role: newRole };
                }
                if (newRole === 'owner' && m.role === 'owner') {
                    return { ...m, role: 'admin' };
                }
                return m;
            })
        );
    };

    const handleAddMember = (newMember: MemberAvatar) => {
        if (!members.some((m) => m.name === newMember.name)) {
            setMembers((prev) => [...prev, { ...newMember, role: newMember.role || 'viewer' }]);
        }
    };

    const availableMembers = systemUsers.filter(
        (dirMember) => !members.some((m) => m.name === dirMember.name)
    );

    const filteredMembers = searchQuery.trim() === ''
        ? []
        : availableMembers.filter((m) =>
            m.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );

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
                            <ModalTitle>Configurações da meta</ModalTitle>
                            <ModalSubtitle>{title || 'Gerenciar informações e membros'}</ModalSubtitle>
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
                            Editar dados
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
                            Gerenciar usuários
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
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>
                                            <Calendar size={15} /> Prazo final
                                        </Label>
                                        <DatePickerWrapper>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date: Date | null) => setSelectedDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                locale={ptBR}
                                                placeholderText="dd/mm/aaaa"
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
                                                    const isOwnerSelf = member.id === currentUser.id && member.role === 'owner';
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
                                                                    <MemberAvatarImg src={member.avatarUrl} alt={member.name} />
                                                                    <MemberName>
                                                                        {member.name}{member.id === currentUser.id ? ' (Você)' : ''}
                                                                    </MemberName>
                                                                </MemberInfo>
                                                                <MemberControls>
                                                                    <RoleSelectDropdown
                                                                        value={member.role || 'viewer'}
                                                                        onChange={(newRole) => handleRoleChange(member.id, newRole)}
                                                                        ariaLabel={`Permissão de ${member.name}`}
                                                                    />
                                                                    {isOwnerSelf ? (
                                                                        <OwnerBadge>Proprietário</OwnerBadge>
                                                                    ) : (
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
                                            filteredMembers.length > 0 ? (
                                                <SearchResultsList>
                                                    {filteredMembers.map((dirMember) => (
                                                        <SearchResultCard key={dirMember.id}>
                                                            <MemberInfo>
                                                                <MemberAvatarImg src={dirMember.avatarUrl} alt={dirMember.name} />
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
                            <DangerActionBtn
                                type="button"
                                onClick={() => setIsConfirmingDelete(true)}
                            >
                                <Trash2 size={13} /> Excluir meta
                            </DangerActionBtn>

                            <FooterActions>
                                <CancelBtn type="button" onClick={onClose}>
                                    Cancelar
                                </CancelBtn>
                                <SaveBtn type="submit">
                                    Salvar alterações
                                </SaveBtn>
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
