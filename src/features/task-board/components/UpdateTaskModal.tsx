import React, { useState, useEffect, useRef } from 'react';
import { X, CheckSquare } from 'lucide-react';
import {
    ModalOverlay,
    ModalContainer,
    ModalHeader,
    ModalTitle,
    CloseButton,
    FormGroup,
    Label,
    Input,
    TextArea,
    TaskRow,
    TaskInputsWrapper,
    ModalFooter,
    SubmitButton,
    CancelButton
} from '../styles/UpdateTaskModal.styles';

interface TaskItem {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

interface UpdateTaskModalProps {
    open: boolean;
    onClose: () => void;
    onUpdateTask: (updatedTasks: TaskItem[]) => void;
    initialTasks?: TaskItem[];
}

interface TaskInputData {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
}

export const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ open, onClose, onUpdateTask, initialTasks = [] }) => {
    const [tasks, setTasks] = useState<TaskInputData[]>([]);

    const firstInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                firstInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [open]);

    useEffect(() => {
        if (initialTasks.length > 0) {
            setTasks(
                initialTasks.map((t) => ({
                    id: t.id,
                    title: t.title.replace(/;$/, ''),
                    description: t.description || '',
                    completed: t.completed,
                }))
            );
        } else {
            setTasks([{ title: '', description: '', completed: false }]);
        }
    }, [initialTasks]);

    const handleTaskChange = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedTasks: TaskItem[] = tasks
            .filter((item) => item.title.trim() !== '')
            .map((item, idx) => ({
                id: item.id || String(Date.now() + idx),
                title: item.title.endsWith(';') ? item.title : `${item.title};`,
                description: item.description.trim() !== '' ? item.description : undefined,
                completed: item.completed,
            }));

        if (formattedTasks.length === 0) return;

        onUpdateTask(formattedTasks);
        onClose();
    };

    if (!open) return null;

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <ModalContainer
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <ModalHeader>
                    <div>
                        <ModalTitle>Atualizar Tarefas</ModalTitle>
                        <p>Edite os dados abaixo para atualizar as tarefas.</p>
                    </div>
                    <CloseButton onClick={onClose} type="button">
                        <X size={20} />
                    </CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <FormGroup>
                            <Label>
                                <CheckSquare size={14} /> Tarefas
                            </Label>
                            <div className="tasks-container">
                                {tasks.map((taskItem, index) => (
                                    <TaskRow key={taskItem.id || `task-row-${index}`}>
                                        <TaskInputsWrapper>
                                            <Input 
                                                ref={index === 0 ? firstInputRef : null}
                                                id={`update-task-input-${index}`}
                                                type="text" 
                                                placeholder="Título da tarefa" 
                                                value={taskItem.title} 
                                                onChange={(e) => handleTaskChange(index, 'title', e.target.value)} 
                                                required
                                            />
                                            <TextArea 
                                                id={`update-task-desc-${index}`}
                                                placeholder="Descrição da tarefa"
                                                value={taskItem.description}
                                                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                                                rows={2}
                                            />
                                        </TaskInputsWrapper>
                                    </TaskRow>
                                ))}
                            </div>
                        </FormGroup>
                    </div>

                    <ModalFooter>
                        <CancelButton type="button" onClick={onClose}>
                            Cancelar
                        </CancelButton>
                        <SubmitButton type="submit">
                            Salvar Alterações
                        </SubmitButton>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};