import { useState, useMemo, useEffect } from 'react';
import type { Task, SubTask, TaskFilterStatus } from '../types';

interface UseGoalDetailParams {
  task: Task;
  onAddTasks?: (newTasks: SubTask[]) => void;
  onUpdateSingleTask?: (updatedTask: SubTask) => void;
  onToggleSubtask?: (subtaskId: string) => void;
  onDeleteTask?: () => void;
  onDeleteSubtask?: (subtaskId: string) => void;
}

export const useGoalDetail = ({
  task,
  onAddTasks,
  onUpdateSingleTask,
  onToggleSubtask,
  onDeleteTask,
  onDeleteSubtask,
}: UseGoalDetailParams) => {
  const [filterStatus, setFilterStatus] = useState<TaskFilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubtaskId, setSelectedSubtaskId] = useState<string | null>(null);

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickDescription, setQuickDescription] = useState('');

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subtaskToDeleteId, setSubtaskToDeleteId] = useState<string | null>(null);

  const [inspectorTitle, setInspectorTitle] = useState('');
  const [inspectorDescription, setInspectorDescription] = useState('');

  const subtasksList = useMemo(() => task.subtasks || [], [task.subtasks]);

  const activeSubtask = useMemo(
    () => subtasksList.find((item) => item.id === selectedSubtaskId) || null,
    [subtasksList, selectedSubtaskId]
  );

  useEffect(() => {
    if (activeSubtask) {
      setInspectorTitle(activeSubtask.title);
      setInspectorDescription(activeSubtask.description || '');
    } else {
      setInspectorTitle('');
      setInspectorDescription('');
    }
  }, [activeSubtask]);

  const totalCount = subtasksList.length;
  const completedCount = useMemo(
    () => subtasksList.filter((item) => item.completed).length,
    [subtasksList]
  );
  const pendingCount = totalCount - completedCount;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredSubtasks = useMemo(() => {
    return subtasksList.filter((item) => {
      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && item.completed) ||
        (filterStatus === 'pending' && !item.completed);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [subtasksList, filterStatus, searchQuery]);

  const handleSelectSubtask = (id: string) => {
    setSelectedSubtaskId((prev) => (prev === id ? null : id));
  };

  const handleQuickAddSubmit = () => {
    const trimmedTitle = quickTitle.trim();
    if (!trimmedTitle) return;

    const newTask: SubTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      description: quickDescription.trim() || undefined,
      completed: false,
    };

    onAddTasks?.([newTask]);
    setQuickTitle('');
    setQuickDescription('');
    setIsQuickAddOpen(false);
  };

  const handleSaveInspector = () => {
    if (!activeSubtask) return;
    const trimmedTitle = inspectorTitle.trim();
    if (!trimmedTitle) return;

    onUpdateSingleTask?.({
      ...activeSubtask,
      title: trimmedTitle,
      description: inspectorDescription.trim() || undefined,
    });
  };

  const handleToggleSubtaskClick = (subtaskId: string) => {
    onToggleSubtask?.(subtaskId);
  };

  const handleOpenDeleteModal = (subtaskId: string | null) => {
    setSubtaskToDeleteId(subtaskId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSubtaskToDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (subtaskToDeleteId) {
      if (selectedSubtaskId === subtaskToDeleteId) {
        setSelectedSubtaskId(null);
      }
      onDeleteSubtask?.(subtaskToDeleteId);
    } else {
      onDeleteTask?.();
    }
    handleCloseDeleteModal();
  };

  return {
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    selectedSubtaskId,
    activeSubtask,
    handleSelectSubtask,
    isQuickAddOpen,
    setIsQuickAddOpen,
    quickTitle,
    setQuickTitle,
    quickDescription,
    setQuickDescription,
    handleQuickAddSubmit,
    isAddTaskModalOpen,
    setIsAddTaskModalOpen,
    isUpdateTaskModalOpen,
    setIsUpdateTaskModalOpen,
    isDeleteModalOpen,
    subtaskToDeleteId,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    inspectorTitle,
    setInspectorTitle,
    inspectorDescription,
    setInspectorDescription,
    handleSaveInspector,
    handleToggleSubtaskClick,
    filteredSubtasks,
    totalCount,
    completedCount,
    pendingCount,
    progressPercent,
  };
};
