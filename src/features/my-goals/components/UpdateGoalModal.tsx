import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Plus, Trash2, Layers, FileText, CheckSquare, AlignLeft, Calendar } from 'lucide-react';
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
    AddTaskButton,
    ModalFooter,
    SubmitButton,
    CancelButton,
    DatePickerWrapper
} from '../styles/UpdateGoalModal.styles';

interface TaskItem {
    id: string;
    title: string;
    completed: boolean;
}

interface Task {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    subtasks?: TaskItem[];
}

interface UpdateGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateGoal: (updatedTask: Task) => void;
    initialGoal?: Task | null;
}

export const UpdateGoalModal: React.FC<UpdateGoalModalProps> = ({
    isOpen,
    onClose,
    onUpdateGoal,
    initialGoal
}) => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [tasks, setTasks] = useState<TaskItem[]>([]);

    const categoryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                categoryInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialGoal) {
            setCategory(initialGoal.category || '');
            setTitle(initialGoal.title || '');
            setDescription(initialGoal.description || '');

            if (initialGoal.deadline) {
                const [day, month, year] = initialGoal.deadline.split('/').map(Number);
                if (day && month && year) {
                    setSelectedDate(new Date(year, month - 1, day));
                } else {
                    setSelectedDate(null);
                }
            } else {
                setSelectedDate(null);
            }

            if (initialGoal.subtasks && initialGoal.subtasks.length > 0) {
                setTasks(initialGoal.subtasks.map(st => ({
                    ...st,
                    title: st.title.endsWith(';') ? st.title.slice(0, -1) : st.title
                })));
            } else {
                setTasks([]);
            }
        }
    }, [initialGoal]);

    const handleAddTaskInput = () => {
        setTasks([
            ...tasks,
            { id: String(Date.now()), title: '', completed: false }
        ]);
    };

    const handleTaskChange = (index: number, value: string) => {
        const updated = [...tasks];
        updated[index].title = value;
        setTasks(updated);
    };

    const handleRemoveTaskInput = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !category.trim()) return;

        const formattedTasks: TaskItem[] = tasks
            .filter((st) => st.title.trim() !== '')
            .map((st, idx) => ({
                id: st.id || String(idx + 1),
                title: st.title.endsWith(';') ? st.title : `${st.title};`,
                completed: st.completed ?? false,
            }));

        const updatedTask: Task = {
            category,
            title,
            description,
            deadline: selectedDate ? selectedDate.toLocaleDateString('pt-BR') : undefined,
            progress: initialGoal ? initialGoal.progress : 0,
            subtasks: formattedTasks.length > 0 ? formattedTasks : undefined,
        };

        onUpdateGoal(updatedTask);
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
                        <ModalTitle>Atualizar Meta</ModalTitle>
                        <p>Edite os dados abaixo para atualizar sua meta.</p>
                    </div>
                    <CloseButton onClick={onClose} type="button">
                        <X size={20} />
                    </CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <FormGroup>
                            <Label htmlFor="update-category-input">
                                <Layers size={14} /> Categoria
                            </Label>
                            <Input 
                                ref={categoryInputRef}
                                id="update-category-input"
                                type="text" 
                                value={category} 
                                placeholder="Ex: Estudos"
                                onChange={(e) => setCategory(e.target.value)} 
                                required 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="update-title-input">
                                <FileText size={14} /> Título
                            </Label>
                            <Input 
                                id="update-title-input"
                                type="text" 
                                value={title} 
                                placeholder="Ex: Aprender inglês"
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="update-description-input">
                                <AlignLeft size={14} /> Descrição
                            </Label>
                            <TextArea 
                                id="update-description-input"
                                placeholder="Descreva os detalhes e objetivos principais desta meta." 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="update-deadline-input">
                                <Calendar size={14} /> Prazo
                            </Label>
                            <DatePickerWrapper>
                                <DatePicker
                                    id="update-deadline-input"
                                    selected={selectedDate}
                                    onChange={(date: Date | null) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/AAAA"
                                    locale={ptBR}
                                    isClearable
                                />
                            </DatePickerWrapper>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <CheckSquare size={14} /> Tarefas
                            </Label>
                            <div className="tasks-container">
                                {tasks.map((taskItem, index) => (
                                    <TaskRow key={taskItem.id || index}>
                                        <Input 
                                            id={`update-task-input-${index}`}
                                            type="text" 
                                            placeholder={`Digite a ${index + 1}° tarefa.`} 
                                            value={taskItem.title} 
                                            onChange={(e) => handleTaskChange(index, e.target.value)} 
                                        />
                                        <button 
                                            type="button" 
                                            title="Remover tarefa"
                                            onClick={() => handleRemoveTaskInput(index)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
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
                            Salvar Alterações
                        </SubmitButton>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    );
};