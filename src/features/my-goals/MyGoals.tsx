import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
    GoalCard, 
    GoalDetailView, 
    AddGoalModal, 
    GoalConfigModal,
    type GoalConfigData,
    GoalStatsBar,
} from './components';
import { membersByTitle, defaultMembers } from './constants/members';
import { initialTasks } from './constants/initialGoals';
import { useCardsPerPage } from './hooks';
import { ConfirmDeleteModal } from '../shared';
import type { SubTask, Task } from './types';
import {
    GoalsPageArea,
    GoalsHeader,
    GoalsTitle,
    GoalsSubtitle,
    AddButton,
    CardGrid,
    GoalCardWrapper,
    ViewSelector,
} from './MyGoals.styles';

export type { SubTask, Task };



export const MyGoals: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [goalToDeleteId, setGoalToDeleteId] = useState<string | null>(null);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [configModalTab, setConfigModalTab] = useState<'details' | 'members'>('details');
    const [highlightedMemberId, setHighlightedMemberId] = useState<string | null>(null);
    const [goalForConfig, setGoalForConfig] = useState<Task | null>(null);

    const totalGoals = tasks.length;
    const inProgressGoals = tasks.filter((t) => 
        t.status === 'Em progresso' || 
        t.status === 'Em desenvolvimento' || 
        t.status === 'Homologação' || 
        t.status === 'Revisão final'
    ).length;
    const urgentGoals = tasks.filter((t) => t.status === 'Prazo final' || t.status === 'Prazo Final').length;
    const averageProgress = totalGoals > 0 
        ? Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / totalGoals) 
        : 0;

    const cardsPerPage = useCardsPerPage();
    const totalPages = Math.ceil(tasks.length / cardsPerPage) || 1;

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + cardsPerPage);

    const selectedTask = selectedTaskId !== null 
        ? tasks.find((t) => t.id === selectedTaskId) || null 
        : null;

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const handleCreateTask = (newTask: Task) => {
        const created: Task = {
            ...newTask,
            id: newTask.id || `goal-${Date.now()}`,
        };
        setTasks([created, ...tasks]);
        setCurrentPage(1);
    };

    const handleOpenDeleteModal = (taskId: string) => {
        setGoalToDeleteId(taskId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (goalToDeleteId !== null) {
            setTasks((prev) => prev.filter((t) => t.id !== goalToDeleteId));
            if (selectedTaskId === goalToDeleteId) {
                setSelectedTaskId(null);
            }
        }
        setIsDeleteModalOpen(false);
        setGoalToDeleteId(null);
    };

    const handleOpenConfigModal = (task: Task, tab: 'details' | 'members' = 'details', memberId?: string) => {
        const existingMembers = task.members && task.members.length > 0 
            ? task.members 
            : (membersByTitle[task.title] || defaultMembers);

        setConfigModalTab(tab);
        setHighlightedMemberId(memberId || null);
        setGoalForConfig({
            ...task,
            members: existingMembers,
        });
        setIsConfigModalOpen(true);
    };

    const handleSaveGoalConfig = (updatedData: GoalConfigData) => {
        if (!goalForConfig) return;

        setTasks((prev) =>
            prev.map((t) => {
                if (t.id === goalForConfig.id || t.title === goalForConfig.title) {
                    return {
                        ...t,
                        category: updatedData.category,
                        title: updatedData.title,
                        description: updatedData.description,
                        deadline: updatedData.deadline,
                        status: updatedData.status,
                        priority: updatedData.priority,
                        members: updatedData.members,
                    };
                }
                return t;
            })
        );

        setIsConfigModalOpen(false);
        setGoalForConfig(null);
    };

    const handleDeleteGoalFromConfig = () => {
        if (!goalForConfig) return;
        const targetId = goalForConfig.id;
        const targetTitle = goalForConfig.title;

        setTasks((prev) => prev.filter((t) => t.id !== targetId && t.title !== targetTitle));
        if (selectedTaskId === targetId) {
            setSelectedTaskId(null);
        }
        setIsConfigModalOpen(false);
        setGoalForConfig(null);
    };

    const handleUpdateSingleTask = (updatedSubtask: SubTask) => {
        if (selectedTaskId !== null) {
            setTasks((prev) => 
                prev.map((t) => {
                    if (t.id !== selectedTaskId) return t;
                    const subtasksList = t.subtasks || [];
                    const newSubtasks = subtasksList.map((st) => 
                        st.id === updatedSubtask.id ? updatedSubtask : st
                    );
                    const total = newSubtasks.length;
                    const completed = newSubtasks.filter((st) => st.completed).length;
                    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return { ...t, subtasks: newSubtasks, progress: newProgress };
                })
            );
        }
    };

    const handleUpdateGoalTasks = (updatedSubtasks: SubTask[]) => {
        if (selectedTaskId !== null) {
            setTasks((prev) => 
                prev.map((t) => {
                    if (t.id !== selectedTaskId) return t;
                    const total = updatedSubtasks.length;
                    const completed = updatedSubtasks.filter((st) => st.completed).length;
                    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return { ...t, subtasks: updatedSubtasks, progress: newProgress };
                })
            );
        }
    };

    const handleAddSubtasks = (newSubtasks: SubTask[]) => {
        if (selectedTaskId !== null) {
            setTasks((prev) => 
                prev.map((t) => {
                    if (t.id !== selectedTaskId) return t;
                    const combined = [...(t.subtasks || []), ...newSubtasks];
                    const total = combined.length;
                    const completed = combined.filter((st) => st.completed).length;
                    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return { ...t, subtasks: combined, progress: newProgress };
                })
            );
        }
    };

    const handleToggleSubtask = (subtaskId: string) => {
        if (selectedTaskId !== null) {
            setTasks((prev) => 
                prev.map((t) => {
                    if (t.id !== selectedTaskId) return t;
                    const subtasksList = t.subtasks || [];
                    const updated = subtasksList.map((st) => 
                        st.id === subtaskId ? { ...st, completed: !st.completed } : st
                    );
                    const total = updated.length;
                    const completed = updated.filter((st) => st.completed).length;
                    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return { ...t, subtasks: updated, progress: newProgress };
                })
            );
        }
    };

    const handleDeleteSubtask = (subtaskId: string) => {
        if (selectedTaskId !== null) {
            setTasks((prev) => 
                prev.map((t) => {
                    if (t.id !== selectedTaskId) return t;
                    const subtasksList = t.subtasks || [];
                    const updated = subtasksList.filter((st) => st.id !== subtaskId);
                    const total = updated.length;
                    const completed = updated.filter((st) => st.completed).length;
                    const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return { ...t, subtasks: updated, progress: newProgress };
                })
            );
        }
    };

    return (
        <GoalsPageArea>
            {selectedTask ? (
                <GoalDetailView 
                    key="task-view"
                    task={selectedTask} 
                    onClose={() => setSelectedTaskId(null)} 
                    onAddTasks={handleAddSubtasks}
                    onUpdateTasks={handleUpdateGoalTasks}
                    onUpdateSingleTask={handleUpdateSingleTask}
                    onToggleSubtask={handleToggleSubtask}
                    onDeleteTask={() => handleOpenDeleteModal(selectedTask.id || '')}
                    onDeleteSubtask={handleDeleteSubtask}
                    onEditGoal={() => handleOpenConfigModal(selectedTask)}
                />
            ) : (
                <>
                    <GoalsHeader>
                        <div>
                            <GoalsTitle>Minhas metas</GoalsTitle>
                            <GoalsSubtitle>
                                Acompanhe o progresso, adicione e gerencie metas.
                            </GoalsSubtitle>
                        </div>
                        <AddButton type="button" onClick={() => setIsModalOpen(true)}>
                            <Plus size={16} /> Adicionar meta
                        </AddButton>
                    </GoalsHeader>

                    <GoalStatsBar 
                        totalGoals={totalGoals}
                        inProgressGoals={inProgressGoals}
                        urgentGoals={urgentGoals}
                        averageProgress={averageProgress}
                    />

                    <CardGrid id="cardGrid">
                        {currentTasks.map((task) => (
                            <GoalCardWrapper 
                                key={task.id || task.title} 
                                onClick={() => setSelectedTaskId(task.id || null)} 
                            >
                                <GoalCard
                                    category={task.category}
                                    title={task.title}
                                    progress={task.progress}
                                    description={task.description}
                                    deadline={task.deadline}
                                    status={task.status}
                                    priority={task.priority}
                                    members={task.members}
                                    onOpenSettings={(tab, memberId) => handleOpenConfigModal(task, tab, memberId)}
                                />
                            </GoalCardWrapper>
                        ))}
                    </CardGrid>

                    <ViewSelector>
                        <button 
                            id="prevBtn" 
                            type="button"
                            onClick={handlePrev} 
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} /> Voltar
                        </button>
                        <span id="pageIndicator">{currentPage} / {totalPages}</span>
                        <button 
                            id="nextBtn" 
                            type="button"
                            onClick={handleNext} 
                            disabled={currentPage === totalPages}
                        >
                            Próximo <ChevronRight size={16} />
                        </button>
                    </ViewSelector>
                </>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <AddGoalModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        onAddGoal={handleCreateTask} 
                    />
                )}


                {isDeleteModalOpen && (
                    <ConfirmDeleteModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setGoalToDeleteId(null);
                        }}
                        onConfirm={handleConfirmDelete}
                    />
                )}

                {isConfigModalOpen && goalForConfig && (
                    <GoalConfigModal
                        isOpen={isConfigModalOpen}
                        initialTab={configModalTab}
                        highlightedMemberId={highlightedMemberId}
                        onClose={() => {
                            setIsConfigModalOpen(false);
                            setGoalForConfig(null);
                            setHighlightedMemberId(null);
                        }}
                        goal={{
                            category: goalForConfig.category,
                            title: goalForConfig.title,
                            description: goalForConfig.description,
                            deadline: goalForConfig.deadline,
                            status: goalForConfig.status,
                            priority: goalForConfig.priority,
                            members: goalForConfig.members,
                        }}
                        onSaveGoal={handleSaveGoalConfig}
                        onDeleteGoal={handleDeleteGoalFromConfig}
                    />
                )}
            </AnimatePresence>
        </GoalsPageArea>
    );
};
