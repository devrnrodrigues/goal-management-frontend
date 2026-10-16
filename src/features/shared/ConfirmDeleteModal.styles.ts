import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 23, 42, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(6px);
    padding: 16px;
`;

export const ModalContainer = styled(motion.div)`
    background: #ffffff;
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    border: 1px solid #f1f5f9;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const ModalContent = styled.div`
    padding: 24px 24px 20px 24px;
    display: flex;
    gap: 16px;
    position: relative;
`;

export const IconWrapper = styled.div`
    background: #fef2f2;
    color: #ef4444;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-right: 24px; // Espaço para o botão de fechar não sobrepor
`;

export const ModalTitle = styled.h2`
    font-size: 1rem;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
    line-height: 1.4;
`;

export const ModalDescription = styled.p`
    margin: 0;
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.5;
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;

    &:hover {
        background: #f1f5f9;
        color: #0f172a;
    }
`;

export const ModalFooter = styled.div`
    padding: 16px 24px 24px 24px;
    background: #f8fafc;
    border-top: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
`;

export const BaseButton = styled.button`
    padding: 10px 18px;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
`;

export const CancelButton = styled(BaseButton)`
    background: #ffffff;
    border: none;
    color: #475569;

    &:hover {
        background: #f1f5f9;
        color: #0f172a;
    }
`;

export const SubmitButton = styled(BaseButton)`
    background: #ef4444;
    border: 1px solid #ef4444;
    color: #ffffff;

    &:hover {
        background: #dc2626;
        border-color: #dc2626;
    }
`;