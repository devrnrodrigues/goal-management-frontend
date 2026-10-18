import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { BoardColumn } from '../types';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseBtn,
  ModalBody,
  FormGroup,
  FormLabel,
  FormInput,
  ColorPalette,
  ColorOption,
  ModalFooter,
  CancelButton,
  SubmitButton,
} from '../styles/ColumnModal.styles';

const availableColors = [
  '#3b82f6',
  '#f59e0b',
  '#8b5cf6',
  '#10b981',
  '#ef4444',
  '#06b6d4',
  '#ec4899',
  '#64748b',
];

interface ColumnModalProps {
  isOpen: boolean;
  column?: BoardColumn | null;
  onClose: () => void;
  onSave: (title: string, color: string) => void;
}

export const ColumnModal: React.FC<ColumnModalProps> = ({
  isOpen,
  column,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  useEffect(() => {
    if (column) {
      setTitle(column.title);
      setSelectedColor(column.color || availableColors[0]);
    } else {
      setTitle('');
      setSelectedColor(availableColors[0]);
    }
  }, [column, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim(), selectedColor);
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
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>
            {column ? 'Editar coluna' : 'Adicionar nova coluna'}
          </ModalTitle>
          <CloseBtn type="button" onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <FormLabel>Nome da coluna</FormLabel>
              <FormInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome da coluna"
                required
                autoFocus
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Cor indicadora</FormLabel>
              <ColorPalette>
                {availableColors.map((color) => (
                  <ColorOption
                    key={color}
                    type="button"
                    $color={color}
                    $isSelected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </ColorPalette>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SubmitButton type="submit">Salvar</SubmitButton>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};
