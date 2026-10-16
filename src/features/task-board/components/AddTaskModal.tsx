import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, CheckSquare } from 'lucide-react';
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
    AddTaskButton,
    ModalFooter,
    SubmitButton,
    CancelButton
} from '../styles/AddTaskModal.styles';

interface TaskItem {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
}

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (newTasks: TaskItem[]) => void;
}

interface TaskInputData {
    title: string;
    description: string;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
    const [newTasks, setNewTasks] = useState<TaskInputData[]>([{ title: '', description: '' }]);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleAddTaskInput = () => {
        setNewTasks((prev) => {
            const updated = [...prev, { title: '', description: '' }];
            setTimeout(() => {
                const lastIndex = updated.length - 1;
                inputRefs.current[lastIndex]?.focus();
            }, 50);
            return updated;
        });
    };

    const handleTaskChange = (index: number, field: 'title' | 'description', value: string) => {
        const updated = [...newTasks];
        updated[index][field] = value;
        setNewTasks(updated);
    };

    const handleRemoveTaskInput = (index: number) => {
        setNewTasks(newTasks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formattedTasks: TaskItem[] = newTasks
            .filter((item) => item.title.trim() !== '')
            .map((item, idx) => ({
                id: String(Date.now() + idx),
                title: item.title.endsWith(';') ? item.title : `${item.title};`,
                description: item.description.trim() !== '' ? item.description : undefined,
                completed: false,
            }));

        if (formattedTasks.length === 0) return;

        onAddTask(formattedTasks);
        setNewTasks([{ title: '', description: '' }]);
        onClose();
    };

    if (!isOpen) return null;

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
                        <ModalTitle>Adicionar Tarefas</ModalTitle>
                        <p>Preencha os dados abaixo para incluir novas tarefas.</p>
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
                                {newTasks.map((taskItem, index) => (
                                    <TaskRow key={index}>
                                        <TaskInputsWrapper>
                                            <Input 
                                                ref={(el) => {
                                                    inputRefs.current[index] = el;
                                                }}
                                                id={`task-input-${index}`}
                                                type="text" 
                                                placeholder="Ex: Ler um livro" 
                                                value={taskItem.title} 
                                                onChange={(e) => handleTaskChange(index, 'title', e.target.value)} 
                                                required
                                            />
                                            <TextArea 
                                                id={`task-desc-${index}`}
                                                placeholder="Descreva os detalhes e objetivos principais desta tarefa."
                                                value={taskItem.description}
                                                onChange={(e) => handleTaskChange(index, 'description', e.target.value)}
                                                rows={2}
                                            />
                                        </TaskInputsWrapper>
                                        {newTasks.length > 1 && (
                                            <button 
                                                type="button" 
                                                title="Remover tarefa"
                                                onClick={() => handleRemoveTaskInput(index)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </TaskRow>
                                ))}
                            </div>
                            <AddTaskButton type="button" onClick={handleAddTaskInput}>
                                <Plus size={15} /> Adicionar tarefa
                            </AddTaskButton>
                        </FormGroup>
                    </div>

                    <ModalFooter>
                        <CancelButton type="button" onClick={onClose}>
                            Cancelar
                        </CancelButton>
                        <SubmitButton type="submit">
                            Salvar Tarefas
                        </SubmitButton>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};