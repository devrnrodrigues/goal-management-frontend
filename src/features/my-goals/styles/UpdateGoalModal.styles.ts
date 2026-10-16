import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
`;

export const ModalContainer = styled(motion.div)`
    background: 
        linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
    background-size: cover;
    background-position: center;
    padding: 28px;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border: none;

    form {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
    }

    .modal-body {
        overflow-y: auto;
        max-height: 55vh;
        
       scrollbar-width: none;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
    padding-bottom: 14px;

    div {
        p {
            font-size: 13px;
            color: #64748b;
            margin-top: 4px;
        }
    }
`;

export const ModalTitle = styled.h2`
    font-size: 18px;
    color: #0f172a;
    font-weight: 600;
    letter-spacing: -0.01em;
`;

export const CloseButton = styled.button`
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        color: #0f172a;
    }
`;

export const FormGroup = styled.div`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .tasks-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;

export const Label = styled.label`
    font-size: 13px;
    color: #334155;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
        color: #2E7D32;
    }
`;

export const Input = styled.input`
    padding: 9px 12px;
    border: 1px solid white;
    border-radius: 8px;
    font-size: 12px;
    color: #0f172a;
    outline: none;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.85);

     &::placeholder {
    color: #94a3b8;
    opacity: 0;
    transition: opacity 0.2s ease;
    }
    &:focus::placeholder {
    opacity: 1;
    }

    &:focus {
        border: 1px solid #2E7D32;
    }
`;

export const TextArea = styled.textarea`
    padding: 9px 12px;
    border: 1px solid white;
    border-radius: 8px;
    font-size: 12px;
    color: #0f172a;
    outline: none;
    resize: vertical;
    min-height: 70px;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.85);

     &::placeholder {
    color: #94a3b8;
    opacity: 0;
    transition: opacity 0.2s ease;
    }
    &:focus::placeholder {
    opacity: 1;
    }

    &:focus {
        border-color: #2E7D32;
    }
`;

export const DatePickerWrapper = styled.div`
    width: 100%;

    .react-datepicker-wrapper {
        width: 100%;
        display: block;
    }

    .react-datepicker__input-container {
        width: 100%;
        display: block;
    }

    input {
        padding: 9px 12px;
        border: 1px solid white;
        border-radius: 8px;
        font-size: 14px;
        color: #0f172a;
        outline: none;
        background: rgba(255, 255, 255, 0.85);
        width: 100%;
        box-sizing: border-box;
        transition: all 0.2s ease;

        &:focus {
            border-color: #2E7D32;
        }
        &::placeholder {
            color: #94a3b8;
        }
    }
`;

export const TaskRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;

    input {
        flex: 1;
    }

    button {
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        cursor: pointer;
        padding: 9px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;

        &:hover {
            background: #fee2e2;
        }
    }
`;

export const AddTaskButton = styled.button`
    background: #f0fdf4;
    border: 1px dashed #2E7D32;
    color: #2E7D32;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 4px;
    transition: all 0.2s;

    &:hover {
        background: #dcfce7;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid rgba(226, 232, 240, 0.6);
`;

export const CancelButton = styled.button`
    background: rgba(255, 255, 255, 0.9);
    border: none;
    color: #475569;
    padding: 9px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
        background: #f8fafc;
        color: #0f172a;
    }
`;

export const SubmitButton = styled.button`
    background: 
            radial-gradient(circle at 80% 20%, rgba(168, 230, 29, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(46, 125, 50, 0.6) 0%, transparent 60%),
            linear-gradient(135deg, #0b1a0f 0%, #112a17 50%, #050d08 100%);
    border: none;
    color: white;
    padding: 9px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    box-shadow: 0 4px 6px -1px rgba(46, 125, 50, 0.2);
`;