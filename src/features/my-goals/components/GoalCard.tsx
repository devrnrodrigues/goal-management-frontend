import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, ArrowLeft, Info, Calendar } from 'lucide-react';
import {
    CardContainer,
    CardInfoIcon,
    CardCategory,
    CardTitle,
    ProgressContainer,
    ProgressBar,
    ProgressTextInside,
    TooltipContainer
} from '../styles/GoalCard.styles';

interface GoalCardProps {
    category: string;
    title: string;
    progress: number;
    description: string;
    deadline?: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
    category,
    title,
    progress,
    description,
    deadline,
    onEdit,
    onDelete
}) => {
    const [expanded, setExpanded] = useState(false);
    const [isFlipping, setIsFlipping] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isInfoHovered, setIsInfoHovered] = useState(false);

    function flip(to: boolean) {
        setIsFlipping(true);
        setTimeout(() => {
            setExpanded(to);
        }, 50);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const hasDescription = description && description.trim() !== "";

    return (
        <motion.div
            style={{
                perspective: 1000,
                width: "100%",
                height: "100%",
            }}
            animate={{ rotateY: isFlipping ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={() => setIsFlipping(false)}
        >
            <CardContainer
                style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && !expanded && !isInfoHovered && (
                        <TooltipContainer
                            style={{
                                left: mousePosition.x + 15,
                                top: mousePosition.y + 15,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                        >
                            Abrir meta
                        </TooltipContainer>
                    )}
                </AnimatePresence>

                {expanded ? (
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div style={{ display: "flex", gap: "16px", cursor: "pointer" }}>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit?.();
                                    }}
                                    style={{ 
                                        display: "inline-flex", 
                                        alignItems: "center", 
                                        color: "#333",
                                        transition: "color 0.2s ease, transform 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#2E7D32";
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#333";
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    <Edit size={20} />
                                </span>

                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.();
                                    }}
                                    style={{ 
                                        display: "inline-flex", 
                                        alignItems: "center", 
                                        color: "#333",
                                        transition: "color 0.2s ease, transform 0.2s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#D32F2F";
                                        e.currentTarget.style.transform = "scale(1.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#333";
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    <Trash2 size={20} />
                                </span>
                            </div>

                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    flip(false);
                                }}
                                style={{ 
                                    display: "inline-flex", 
                                    alignItems: "center", 
                                    color: "#333", 
                                    cursor: "pointer",
                                    transition: "color 0.2s ease, transform 0.2s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "#2E7D32";
                                    e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "#333";
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                <ArrowLeft size={24} />
                            </span>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", margin: "auto 0" }}>
                            {hasDescription ? (
                                <CardTitle style={{ fontSize: "18px", fontWeight: "400", lineHeight: "1.4" }}>
                                    {description}
                                </CardTitle>
                            ) : (
                                <CardCategory>Não há descrição.</CardCategory>
                            )}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#666", fontWeight: "500" }}>
                            <Calendar size={15} style={{ color: "#2E7D32" }} />
                            <span>{deadline ? `Prazo: ${deadline}` : "Sem prazo"}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <CardInfoIcon
                            onClick={(e) => {
                                e.stopPropagation();
                                flip(true);
                            }}
                            onMouseEnter={() => setIsInfoHovered(true)}
                            onMouseLeave={() => setIsInfoHovered(false)}
                        >
                            <Info size={26} />
                        </CardInfoIcon>
                        <div>
                            <CardCategory>{category}</CardCategory>
                            <CardTitle>{title}</CardTitle>
                        </div>
                        <div>
                            <ProgressContainer>
                                <ProgressBar $progress={progress}>
                                    <ProgressTextInside>{progress}%</ProgressTextInside>
                                </ProgressBar>
                            </ProgressContainer>
                        </div>
                    </>
                )}
            </CardContainer>
        </motion.div>
    );
};