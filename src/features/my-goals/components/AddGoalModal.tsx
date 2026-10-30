import React, { useState, useEffect, useCallback, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { AnimatePresence } from 'framer-motion';
import {
    X,
    Target,
    FileText,
    Users,
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
    SearchContainer,
    SearchInputWrapper,
    SearchInput,
    ClearSearchBtn,
    SearchResultsList,
    SearchResultCard,
    AddMemberBtn,
    EmptyNotice,
    ModalFooter,
    CancelButton,
    SubmitButton
} from '../styles/AddGoalModal.styles';
import { RoleSelectDropdown } from './RoleSelectDropdown';
import { useDevMode } from '../../shared/hooks/useDevMode';
import { getStoredUser } from '../../shared/api/httpClient';
import { usersApi } from '../../shared/api/usersApi';
import { getInitials } from '../../shared/utils/avatarUtils';
import { type MemberAvatar, type MemberRole, systemUsers, currentUser } from '../constants/members';
import type { Task } from '../types';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddGoal: (newTask: Task) => void;
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

const getDefaultOwner = (isMock: boolean): MemberAvatar[] => {
    if (isMock) {
        return [currentUser];
    }
    const storedUser = getStoredUser();
    if (storedUser && storedUser.id) {
        return [{
            id: storedUser.id,
            name: storedUser.name || 'Você',
            avatarUrl: storedUser.avatarUrl || '',
            role: 'owner',
            email: storedUser.email,
        }];
    }
    return [];
};

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
    const { isMock } = useDevMode();
    const [activeTab, setActiveTab] = useState<'details' | 'members'>('details');
    const [tabDirection, setTabDirection] = useState<number>(0);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Média prioridade');
    const [status, setStatus] = useState('Planejamento');
    const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
        const defaultDeadline = new Date();
        defaultDeadline.setMonth(defaultDeadline.getMonth() + 1);
        return defaultDeadline;
    });
    const [members, setMembers] = useState<MemberAvatar[]>(() => getDefaultOwner(isMock));
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<MemberAvatar[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');

    const modalBodyRef = useRef<HTMLDivElement>(null);
    const categoryInputRef = useRef<HTMLInputElement>(null);
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
        if (isOpen) {
            setActiveTab('details');
            setTabDirection(0);
            setMembers(getDefaultOwner(isMock));
            const timer = setTimeout(() => {
                categoryInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isMock]);

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

    if (!isOpen) return null;

    const filteredMembers = isMock
        ? (searchQuery.trim() === ''
            ? []
            : systemUsers
                .filter((dirMember) => !members.some((m) => m.id === dirMember.id || m.name === dirMember.name))
                .filter((m) => m.name.toLowerCase().includes(searchQuery.trim().toLowerCase())))
        : searchedUsers;

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

    const handleAddMember = (newMember: MemberAvatar) => {
        if (!members.some((m) => m.id === newMember.id || m.name === newMember.name)) {
            setMembers((prev) => [...prev, { ...newMember, role: newMember.role || 'viewer' }]);
        }
    };

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !category.trim()) return;

        let formattedDeadline: string | undefined;
        if (selectedDate) {
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const year = selectedDate.getFullYear();
            formattedDeadline = `${day}/${month}/${year}`;
        }

        const newTask: Task = {
            category: category.trim(),
            title: title.trim(),
            description: description.trim(),
            deadline: formattedDeadline,
            priority,
            status,
            progress: 0,
            members,
        };

        onAddGoal(newTask);
        setCategory('');
        setTitle('');
        setDescription('');
        setPriority('Média prioridade');
        setStatus('Planejamento');
        setSearchQuery('');
        onClose();
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
                            <Target size={22} />
                        </ModalHeaderIconWrapper>
                        <ModalTitleGroup>
                            <ModalTitle>Nova meta</ModalTitle>
                            <ModalSubtitle>{title || 'Configure as informações e membros da meta'}</ModalSubtitle>
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
                                layoutId="activeAddGoalTab"
                                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                            />
                        )}
                        <TabButtonText>
                            <FileText size={16} />
                            Dados da meta
                        </TabButtonText>
                    </ModalTabButton>

                    <ModalTabButton
                        type="button"
                        $active={activeTab === 'members'}
                        onClick={() => handleSwitchTab('members')}
                    >
                        {activeTab === 'members' && (
                            <ActiveTabIndicator
                                layoutId="activeAddGoalTab"
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
                                            <Label htmlFor="add-goal-category">
                                                <Tag size={15} /> Categoria
                                            </Label>
                                            <Input
                                                ref={categoryInputRef}
                                                id="add-goal-category"
                                                type="text"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                placeholder="Categoria"
                                                required
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label htmlFor="add-goal-deadline">
                                                <Calendar size={15} /> Prazo final
                                            </Label>
                                            <DatePickerWrapper>
                                                <DatePicker
                                                    id="add-goal-deadline"
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
                                        <Label htmlFor="add-goal-title">
                                            <FileText size={15} /> Título da meta
                                        </Label>
                                        <Input
                                            id="add-goal-title"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Título"
                                            required
                                        />
                                    </FormGroup>

                                    <FormRow>
                                        <FormGroup>
                                            <Label htmlFor="add-goal-priority">
                                                <AlertCircle size={15} /> Prioridade
                                            </Label>
                                            <Select
                                                id="add-goal-priority"
                                                value={priority}
                                                onChange={(e) => setPriority(e.target.value)}
                                            >
                                                <option value="Alta prioridade">Alta prioridade</option>
                                                <option value="Média prioridade">Média prioridade</option>
                                                <option value="Baixa prioridade">Baixa prioridade</option>
                                            </Select>
                                        </FormGroup>

                                        <FormGroup>
                                            <Label htmlFor="add-goal-status">
                                                <Activity size={15} /> Status atual
                                            </Label>
                                            <Select
                                                id="add-goal-status"
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
                                        <Label htmlFor="add-goal-description">Descrição da meta</Label>
                                        <TextArea
                                            id="add-goal-description"
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
                                                            const storedUser = getStoredUser();
                                                            const currentUserId = isMock ? currentUser.id : (storedUser?.id || '');
                                                            const isSelf = member.id === currentUserId || (Boolean(storedUser?.email) && member.email === storedUser?.email);
                                                            const isOwnerSelf = isSelf && member.role === 'owner';
                                                            return (
                                                                <MemberItemWrapper
                                                                    key={member.id}
                                                                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                                                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                                                >
                                                                    <MemberCard>
                                                                        <MemberInfo>
                                                                            {member.avatarUrl ? (
                                                                                <MemberAvatarImg src={member.avatarUrl} alt={member.name} />
                                                                            ) : (
                                                                                <MemberAvatarInitials>{getInitials(member.name)}</MemberAvatarInitials>
                                                                            )}
                                                                            <MemberName>
                                                                                {member.name}{isSelf ? ' (Você)' : ''}
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
                                                                                    onClick={() => handleRemoveMember(member.id)}
                                                                                >
                                                                                    <User size={13} /> Remover
                                                                                </RemoveMemberBtn>
                                                                            )}
                                                                        </MemberControls>
                                                                    </MemberCard>
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
                                                    isSearching ? (
                                                        <EmptyNotice>Buscando usuários...</EmptyNotice>
                                                    ) : filteredMembers.length > 0 ? (
                                                        <SearchResultsList>
                                                            {filteredMembers.map((dirMember) => (
                                                                <SearchResultCard key={dirMember.id}>
                                                                    <MemberInfo>
                                                                        {dirMember.avatarUrl ? (
                                                                            <MemberAvatarImg src={dirMember.avatarUrl} alt={dirMember.name} />
                                                                        ) : (
                                                                            <MemberAvatarInitials>{getInitials(dirMember.name)}</MemberAvatarInitials>
                                                                        )}
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
                        <CancelButton type="button" onClick={onClose}>
                            Cancelar
                        </CancelButton>
                        <SubmitButton type="submit">
                            Criar meta
                        </SubmitButton>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};
