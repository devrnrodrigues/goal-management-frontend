import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MotionViewContainer = styled(motion.div)`
    max-width: 1300px;
    width: 100%;
    margin: 100px auto 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 30px;
    box-shadow: 0 4px 5px rgba(0,0,0,0.09);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 120px);
    box-sizing: border-box;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const HeaderActions = styled.div`
    display: flex;
    gap: 16px;
`;

export const HeaderActionBtn = styled.span<{ $isDelete?: boolean }>`
    display: inline-flex;
    align-items: center;
    color: #333;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: ${({ $isDelete }) => ($isDelete ? '#D32F2F' : '#2E7D32')};
        transform: scale(1.1);
    }
`;

export const BackBtn = styled.span`
    display: inline-flex;
    align-items: center;
    color: #333;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: #2E7D32;
        transform: scale(1.1);
    }
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    color: #222;
    text-align: center;
`;

export const ListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 4px 6px 4px 0;
    scrollbar-width: none;
`;

export const ListItem = styled.div<{ $isExpandedOrEditing: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ $isExpandedOrEditing }) => ($isExpandedOrEditing ? '12px' : '0px')};
    background: rgba(255, 255, 255, 0.45);
    padding: 15px 15px 15px 25px;
    border-radius: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: gap 0.2s ease;
`;

export const ItemMainRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const ItemLeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
`;

export const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    width: 20px;
    height: 20px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const StyledCheckbox = styled.div<{ $checked: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 2px solid ${({ $checked }) => ($checked ? '#2E7D32' : '#BDBDBD')};
    background: ${({ $checked }) => ($checked ? '#2E7D32' : 'transparent')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &::after {
        content: '✓';
        color: white;
        font-size: 14px;
        display: ${({ $checked }) => ($checked ? 'block' : 'none')};
    }

    &:hover {
        border-color: #2E7D32;
        box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
    }
`;

export const EditTitleInput = styled.input`
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    color: #333;
    padding: 4px 8px;
    width: 100%;
    outline: none;
    transition: all 0.2s ease;

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

export const ItemTitle = styled.span`
    color: #333;
`;

export const ItemActions = styled.div`
    display: flex;
    gap: clamp(15px, 2vw, 25px);
    margin-left: 15px;
    color: #666;
    align-items: center;
`;

export const ActionIconBtn = styled.span<{ $isDelete?: boolean }>`
    display: inline-flex;
    align-items: center;
    color: #666;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: ${({ $isDelete }) => ($isDelete ? '#D32F2F' : '#2E7D32')};
        transform: scale(1.1);
    }
`;

export const AnimatedSection = styled(motion.div)`
    width: 100%;
    overflow: hidden;
`;

export const TextAreaInput = styled.textarea`
    width: 100%;
    background: transparent;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    color: #333;
    padding: 8px;
    min-height: 60px;
    resize: vertical;
    outline: none;
    font-size: 13px;
    transition: all 0.2s ease;

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

export const DescriptionBox = styled.div`
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 14px;
    color: #555555;
    white-space: pre-wrap;
    word-break: break-word;
    &.no-description {
        font-style: italic;
        font-size: 12px;
        color: #666;
    }
`;

export const ExpandedFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 8px;
`;

export const FooterContainer = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
`;

export const CompletedText = styled.div`
    font-size: 12px;
    color: #666;
    font-weight: 500;
    margin-bottom: 6px;
    text-align: left;
`;

export const ProgressWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 20px;
`;

export const ProgressBar = styled.div`
    flex: 1;
    background-color: #E0E0E0;
    height: 10px;
    border-radius: 5px;
    overflow: hidden;
`;

export const ProgressFill = styled.div<{ $width: number }>`
    width: ${({ $width }) => `${$width}%`};
    background-color: #66BB6A;
    height: 100%;
    transition: width 0.4s;
`;

export const ProgressPercent = styled.span`
    font-size: 14px;
    font-weight: 600;
`;

export const AddButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const AddButton = styled.button`
    background: transparent;
    color: #2E7D32;
    border: 1px solid #2E7D32;
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
        background: 
            radial-gradient(circle at 80% 20%, rgba(168, 230, 29, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(46, 125, 50, 0.6) 0%, transparent 60%),
            linear-gradient(135deg, #0b1a0f 0%, #112a17 50%, #050d08 100%);
        color: white;
    }
`;