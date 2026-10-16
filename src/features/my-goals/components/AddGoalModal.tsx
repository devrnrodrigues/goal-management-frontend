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
} from '../styles/AddGoalModal.styles';

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

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddGoal: (newTask: Task) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onAddGoal }) => {
    const [newCategory, setNewCategory] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const defaultDeadline = new Date();
    defaultDeadline.setMonth(defaultDeadline.getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDeadline);
    const [newTasks, setNewTasks] = useState<string[]>(['']);

    const categoryInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                categoryInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleAddTaskInput = () => {
        setNewTasks([...newTasks, '']);
    };

    const handleTaskChange = (index: number, value: string) => {
        const updated = [...newTasks];
        updated[index] = value;
        setNewTasks(updated);
    };

    const handleRemoveTaskInput = (index: number) => {
        setNewTasks(newTasks.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim() || !newCategory.trim()) return;

        const formattedTasks: TaskItem[] = newTasks
            .filter((st) => st.trim() !== '')
            .map((st, idx) => ({
                id: String(idx + 1),
                title: st.endsWith(';') ? st : `${st};`,
                completed: false,
            }));

        const newTask: Task = {
            category: newCategory,
            title: newTitle,
            description: newDescription,
            deadline: selectedDate ? selectedDate.toLocaleDateString('pt-BR') : undefined,
            progress: 0,
            subtasks: formattedTasks.length > 0 ? formattedTasks : undefined,
        };

        onAddGoal(newTask);
        setNewCategory('');
        setNewTitle('');
        setNewDescription('');
        setSelectedDate(null);
        setNewTasks(['']);
        onClose();
    };

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
                        <ModalTitle>Nova meta</ModalTitle>
                        <p>Preencha os dados abaixo com um título e categoria para estruturar sua nova meta.</p>
                    </div>
                    <CloseButton onClick={onClose} type="button">
                        <X size={20} />
                    </CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <FormGroup>
                            <Label htmlFor="category-input">
                                <Layers size={14} /> Categoria *
                            </Label>
                            <Input 
                                ref={categoryInputRef}
                                id="category-input"
                                type="text" 
                                placeholder="Ex: Estudos"
                                value={newCategory} 
                                onChange={(e) => setNewCategory(e.target.value)} 
                                required 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="title-input">
                                <FileText size={14} /> Título *
                            </Label>
                            <Input 
                                id="title-input"
                                type="text" 
                                placeholder="Ex: Aprender inglês"
                                value={newTitle} 
                                onChange={(e) => setNewTitle(e.target.value)} 
                                required 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="description-input">
                                <AlignLeft size={14} /> Descrição 
                            </Label>
                            <TextArea 
                                id="description-input"
                                placeholder="Descreva os detalhes e objetivos principais desta meta."
                                value={newDescription} 
                                onChange={(e) => setNewDescription(e.target.value)} 
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="deadline-input">
                                <Calendar size={14} /> Prazo
                            </Label>
                            <DatePickerWrapper>
                                <DatePicker
                                    id="deadline-input"
                                    selected={selectedDate}
                                    onChange={(date: Date | null) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Indefinido"
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
                                {newTasks.map((taskItem, index) => (
                                    <TaskRow key={index}>
                                        <Input 
                                            id={`task-input-${index}`}
                                            type="text" 
                                            placeholder={`Digite a ${index + 1}° tarefa.`}
                                            value={taskItem} 
                                            onChange={(e) => handleTaskChange(index, e.target.value)} 
                                        />
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
                            Salvar Meta
                        </SubmitButton>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </ModalOverlay>
    ); 
};