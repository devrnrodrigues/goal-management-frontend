import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import {
    ModalOverlay,
    ModalContainer,
    ModalContent,
    IconWrapper,
    TextContent,
    ModalTitle,
    ModalDescription,
    CloseButton,
    ModalFooter,
    SubmitButton,
    CancelButton
} from './ConfirmDeleteModal.styles';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Excluir Meta",
    message = "Tem certeza que deseja excluir esta meta? Esta ação não poderá ser desfeita."
}) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
        >
            <ModalContainer
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <ModalContent>
                    <IconWrapper>
                        <AlertTriangle size={22} />
                    </IconWrapper>

                    <TextContent>
                        <ModalTitle>{title}</ModalTitle>
                        <ModalDescription>{message}</ModalDescription>
                    </TextContent>

                    <CloseButton onClick={onClose} type="button">
                        <X size={18} />
                    </CloseButton>
                </ModalContent>

                <ModalFooter>
                    <CancelButton type="button" onClick={onClose}>
                        Cancelar
                    </CancelButton>
                    <SubmitButton type="button" onClick={onConfirm}>
                        Sim, Excluir
                    </SubmitButton>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};