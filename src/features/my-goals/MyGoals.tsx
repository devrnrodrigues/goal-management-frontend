import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Sidebar, Header } from '../layout';
import { GoalCard, GoalDetailView, AddGoalModal, UpdateGoalModal } from './components';
import { ConfirmDeleteModal } from '../shared';
import { DashboardOverview } from '../dashboard';
import {
    MainContentWrapper,
    DashboardArea,
    DashboardHeader,
    DashboardTitle,
    SectionTitle,
    ViewSelector,
    AddButton,
    CardGrid,
    GoalCardWrapper,
    GreetingText
} from './MyGoals.styles';

interface SubTask {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

interface Task {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    subtasks?: SubTask[];
}

const initialTasks: Task[] = [
    { 
        category: 'Engenharia de Software', 
        title: 'Frontend', 
        progress: 49, 
        description: 'Domínio de conceitos avançados de interface, otimização de performance web, arquiteturas modernas e renderização no lado do servidor para aplicações escaláveis.',
        deadline: '15/12/2026',
        subtasks: [
            { id: '1', title: 'Gerenciamento de estado;', description: 'Estudar Redux Toolkit, Zustand e Context API para aplicações robustas.', completed: true },
            { id: '2', title: 'Testes de Frontend;', description: 'Aprender Jest e React Testing Library para garantir a qualidade.', completed: true },
            { id: '3', title: 'Performance Web;', description: '', completed: true },
            { id: '4', title: 'Segurança no Frontend (XSS, CSRF);', description: 'Entender vulnerabilidades comuns e como preveni-las.', completed: true },
            { id: '5', title: 'SSR / SSG;', description: '', completed: false },
            { id: '6', title: 'Microfrontends;', description: 'Modularização de aplicações grandes com Module Federation.', completed: false },
            { id: '7', title: 'Interface de Usuário (UI);', description: '', completed: false },
            { id: '8', title: 'Experiência de Usuário (UX);', description: 'Foco na jornada do usuário e acessibilidade (a11y).', completed: false },
            { id: '9', title: 'Usabilidade;', description: '', completed: false },
            { id: '10', title: 'Responsividade;', description: 'Mobile-first e adaptação para múltiples dispositivos.', completed: false },
        ]
    },
    { 
        category: 'Engenharia de Software', 
        title: 'Backend', 
        progress: 39, 
        description: '',
        deadline: '20/11/2026',
        subtasks: [
            { id: '1', title: 'Node.js;', description: 'Entender o event loop e arquitetura assíncrona.', completed: true },
            { id: '2', title: 'Express;', description: '', completed: true },
            { id: '3', title: 'JWT Auth;', description: 'Implementação de autenticação baseada em tokens.', completed: true },
            { id: '4', title: 'REST APIs;', description: '', completed: false },
            { id: '5', title: 'GraphQL;', description: 'Consultas flexíveis e tipagem estática com Apollo.', completed: false },
            { id: '6', title: 'Microservices;', description: '', completed: false },
            { id: '7', title: 'Docker;', description: 'Containerização de ambientes de desenvolvimento e produção.', completed: false },
            { id: '8', title: 'Swagger;', description: '', completed: false },
            { id: '9', title: 'Redis;', description: 'Cache em memória para alta performance.', completed: false },
            { id: '10', title: 'Testes unitários;', description: '', completed: false },
        ]
    },
    { 
        category: 'Engenharia de Software', 
        title: 'Banco de Dados', 
        progress: 19, 
        description: 'Modelagem relacional e não relacional, estratégias eficientes de indexação, transações seguras e otimização contínua de consultas.',
        deadline: '10/10/2026',
        subtasks: [
            { id: '1', title: 'SQL básico;', description: 'Comandos DDL, DML e consultas básicas.', completed: true },
            { id: '2', title: 'PostgreSQL;', description: '', completed: true },
            { id: '3', title: 'Indexes;', description: 'Melhoria de performance em buscas complexas.', completed: false },
            { id: '4', title: 'Transações;', description: '', completed: false },
            { id: '5', title: 'NoSQL;', description: 'Conceitos de bancos orientados a documentos.', completed: false },
            { id: '6', title: 'MongoDB;', description: '', completed: false },
            { id: '7', title: 'Redis cache;', description: 'Armazenamento chave-valor de alta velocidade.', completed: false },
            { id: '8', title: 'Modelagem ER;', description: '', completed: false },
            { id: '9', title: 'Migrations;', description: 'Controle de versão do esquema do banco de dados.', completed: false },
            { id: '10', title: 'Backup e Restore;', description: '', completed: false },
        ]
    },
    { 
        category: 'Engenharia de Software', 
        title: 'Nuvem', 
        progress: 49, 
        description: '',
        deadline: '05/01/2027',
        subtasks: [
            { id: '1', title: 'AWS básico;', description: 'Visão geral dos principais serviços da Amazon Web Services.', completed: true },
            { id: '2', title: 'EC2;', description: '', completed: true },
            { id: '3', title: 'S3 buckets;', description: 'Gerenciamento de objetos e arquivos estáticos.', completed: true },
            { id: '4', title: 'IAM;', description: '', completed: true },
            { id: '5', title: 'Serverless;', description: 'Computação sem servidor para redução de custos.', completed: false },
            { id: '6', title: 'Lambda;', description: '', completed: false },
            { id: '7', title: 'CloudFront;', description: 'CDN para entrega rápida de conteúdo global.', completed: false },
            { id: '8', title: 'Route 53;', description: '', completed: false },
            { id: '9', title: 'Docker Swarm;', description: 'Orquestração simples de containers.', completed: false },
            { id: '10', title: 'Kubernetes;', description: '', completed: false },
        ]
    },
    { 
        category: 'Engenharia de Software', 
        title: 'Versionamento', 
        progress: 57, 
        description: 'Fluxos avançados de controle de versão utilizando Git, integração contínua e revisões de código estruturadas.',
        deadline: '30/09/2026',
        subtasks: [
            { id: '1', title: 'Git init;', description: 'Configuração inicial e comandos essenciais.', completed: true },
            { id: '2', title: 'Branching;', description: '', completed: true },
            { id: '3', title: 'Rebase;', description: 'Manutenção de um histórico linear e limpo.', completed: true },
            { id: '4', title: 'Cherry-pick;', description: '', completed: true },
            { id: '5', title: 'Git flow;', description: 'Estratégia de ramificação para equipes.', completed: true },
            { id: '6', title: 'GitHub Actions;', description: '', completed: false },
            { id: '7', title: 'Pull Requests;', description: 'Boas práticas de abertura e descrição.', completed: false },
            { id: '8', title: 'Code Review;', description: '', completed: false },
            { id: '9', title: 'Submodules;', description: 'Gerenciamento de dependências entre repositórios.', completed: false },
            { id: '10', title: 'Git hooks;', description: '', completed: false },
        ]
    },
    { 
        category: 'Engenharia de Software', 
        title: 'Testes', 
        progress: 27, 
        description: '',
        deadline: '18/11/2026',
        subtasks: [
            { id: '1', title: 'Jest;', description: 'Framework de testes em JavaScript.', completed: true },
            { id: '2', title: 'Vitest;', description: '', completed: true },
            { id: '3', title: 'React Testing Library;', description: 'Testes focados no comportamento do usuário.', completed: false },
            { id: '4', title: 'Cypress;', description: '', completed: false },
            { id: '5', title: 'Playwright;', description: 'Automação moderna para testes E2E.', completed: false },
            { id: '6', title: 'TDD;', description: '', completed: false },
            { id: '7', title: 'Mocking;', description: 'Simulação de APIs e funções isoladas.', completed: false },
            { id: '8', title: 'Coverage;', description: '', completed: false },
            { id: '9', title: 'E2E testing;', description: 'Validação de fluxos completos de ponta a ponta.', completed: false },
            { id: '10', title: 'Integration tests;', description: '', completed: false },
        ]
    },
];

export const MyGoals: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [goalToEdit, setGoalToEdit] = useState<Task | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

    const cardsPerPage = 6;
    const totalPages = Math.ceil(tasks.length / cardsPerPage) || 1;

    const startIndex = (currentPage - 1) * cardsPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + cardsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleCreateTask = (newTask: Task) => {
        setTasks([newTask, ...tasks]);
        setCurrentPage(1);
    };

    const handleOpenEditModal = (absoluteIndex: number) => {
        setEditingIndex(absoluteIndex);
        setGoalToEdit(tasks[absoluteIndex]);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateGoal = (updatedTask: Task) => {
        if (editingIndex !== null) {
            const updatedTasks = [...tasks];
            const oldTask = updatedTasks[editingIndex];

            const subtasks = updatedTask.subtasks || oldTask.subtasks || [];
            const total = subtasks.length;
            const completed = subtasks.filter((st) => st.completed).length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : oldTask.progress;

            updatedTasks[editingIndex] = {
                ...updatedTask,
                subtasks,
                progress,
            };

            setTasks(updatedTasks);
        }
        setIsUpdateModalOpen(false);
        setGoalToEdit(null);
        setEditingIndex(null);
    };

    const handleOpenDeleteModal = (absoluteIndex: number) => {
        setDeletingIndex(absoluteIndex);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingIndex !== null) {
            const updatedTasks = tasks.filter((_, idx) => idx !== deletingIndex);
            setTasks(updatedTasks);
            if (selectedTaskIndex === deletingIndex) {
                setSelectedTaskIndex(null);
            } else if (selectedTaskIndex !== null && selectedTaskIndex > deletingIndex) {
                setSelectedTaskIndex(selectedTaskIndex - 1);
            }
        }
        setIsDeleteModalOpen(false);
        setDeletingIndex(null);
    };

    const handleUpdateSingleTask = (updatedSubtask: SubTask) => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const currentTask = updatedTasks[selectedTaskIndex];
            const subtasksList = currentTask.subtasks || [];

            const newSubtasks = subtasksList.map((st) => 
                st.id === updatedSubtask.id ? updatedSubtask : st
            );

            const total = newSubtasks.length;
            const completed = newSubtasks.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

            updatedTasks[selectedTaskIndex] = {
                ...currentTask,
                subtasks: newSubtasks,
                progress: newProgress,
            };

            setTasks(updatedTasks);
        }
    };

    const handleUpdateGoalTasks = (updatedSubtasks: SubTask[]) => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const currentTask = updatedTasks[selectedTaskIndex];

            const total = updatedSubtasks.length;
            const completed = updatedSubtasks.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

            updatedTasks[selectedTaskIndex] = {
                ...currentTask,
                subtasks: updatedSubtasks,
                progress: newProgress,
            };

            setTasks(updatedTasks);
        }
    };

    const handleAddSubtasks = (newSubtasks: SubTask[]) => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const currentTask = updatedTasks[selectedTaskIndex];
            const existingSubtasks = currentTask.subtasks || [];
            
            const combinedSubtasks = [...existingSubtasks, ...newSubtasks];
            const total = combinedSubtasks.length;
            const completed = combinedSubtasks.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

            updatedTasks[selectedTaskIndex] = {
                ...currentTask,
                subtasks: combinedSubtasks,
                progress: newProgress,
            };

            setTasks(updatedTasks);
        }
    };

    const handleToggleSubtask = (subtaskId: string) => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const currentTask = updatedTasks[selectedTaskIndex];
            const subtasksList = currentTask.subtasks || [];

            const updatedSubtasks = subtasksList.map((st) => 
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
            );

            const total = updatedSubtasks.length;
            const completed = updatedSubtasks.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

            updatedTasks[selectedTaskIndex] = {
                ...currentTask,
                subtasks: updatedSubtasks,
                progress: newProgress,
            };

            setTasks(updatedTasks);
        }
    };

    const handleDeleteSubtask = (subtaskId: string) => {
        if (selectedTaskIndex !== null) {
            const updatedTasks = [...tasks];
            const currentTask = updatedTasks[selectedTaskIndex];
            const subtasksList = currentTask.subtasks || [];

            const updatedSubtasks = subtasksList.filter((st) => st.id !== subtaskId);

            const total = updatedSubtasks.length;
            const completed = updatedSubtasks.filter((st) => st.completed).length;
            const newProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

            updatedTasks[selectedTaskIndex] = {
                ...currentTask,
                subtasks: updatedSubtasks,
                progress: newProgress,
            };

            setTasks(updatedTasks);
        }
    };

    return (
        <>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <MainContentWrapper>
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                
                <AnimatePresence mode="wait">
                    {selectedTaskIndex !== null ? (
                        <GoalDetailView 
                            key="task-view"
                            task={tasks[selectedTaskIndex]} 
                            onClose={() => setSelectedTaskIndex(null)} 
                            onAddTasks={handleAddSubtasks}
                            onUpdateTasks={handleUpdateGoalTasks}
                            onUpdateSingleTask={handleUpdateSingleTask}
                            onToggleSubtask={handleToggleSubtask}
                            onDeleteTask={() => handleOpenDeleteModal(selectedTaskIndex)}
                            onDeleteSubtask={handleDeleteSubtask}
                        />
                    ) : (
                        <DashboardArea key="dashboard-grid">
                            <DashboardHeader>
                                <div>
                                    <GreetingText>Olá, Renan Rodrigues!</GreetingText>
                                    <DashboardTitle>Acompanhe e gerencie a evolução de suas metas</DashboardTitle>
                                </div>
                                <AddButton onClick={() => setIsModalOpen(true)}>
                                    <Plus size={16} /> Adicionar Meta
                                </AddButton>
                            </DashboardHeader>

                            <DashboardOverview />

                            <SectionTitle>Metas Cadastradas</SectionTitle>

                            <CardGrid id="cardGrid">
                                {currentTasks.map((task, index) => {
                                    const absoluteIndex = startIndex + index;

                                    return (
                                        <GoalCardWrapper 
                                            key={`${task.title}-${absoluteIndex}`} 
                                            onClick={() => setSelectedTaskIndex(absoluteIndex)} 
                                        >
                                            <GoalCard
                                                category={task.category}
                                                title={task.title}
                                                progress={task.progress}
                                                description={task.description}
                                                deadline={task.deadline}
                                                onEdit={() => handleOpenEditModal(absoluteIndex)}
                                                onDelete={() => handleOpenDeleteModal(absoluteIndex)}
                                            />
                                        </GoalCardWrapper>
                                    );
                                })}
                            </CardGrid>

                            <ViewSelector>
                                <button id="prevBtn" onClick={handlePrev} disabled={currentPage === 1}>
                                    <ChevronLeft size={16} /> Voltar
                                </button>
                                <span id="pageIndicator">{currentPage} / {totalPages}</span>
                                <button id="nextBtn" onClick={handleNext} disabled={currentPage === totalPages}>
                                    Próximo <ChevronRight size={16} />
                                </button>
                            </ViewSelector>
                        </DashboardArea>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isModalOpen && (
                        <AddGoalModal 
                            isOpen={isModalOpen} 
                            onClose={() => setIsModalOpen(false)} 
                            onAddGoal={handleCreateTask} 
                        />
                    )}

                    {isUpdateModalOpen && (
                        <UpdateGoalModal
                            isOpen={isUpdateModalOpen}
                            onClose={() => {
                                setIsUpdateModalOpen(false);
                                setGoalToEdit(null);
                                setEditingIndex(null);
                            }}
                            onUpdateGoal={handleUpdateGoal}
                            initialGoal={goalToEdit}
                        />
                    )}

                    {isDeleteModalOpen && (
                        <ConfirmDeleteModal
                            isOpen={isDeleteModalOpen}
                            onClose={() => {
                                setIsDeleteModalOpen(false);
                                setDeletingIndex(null);
                            }}
                            onConfirm={handleConfirmDelete}
                        />
                    )}
                </AnimatePresence>
            </MainContentWrapper>
        </>
    );
};