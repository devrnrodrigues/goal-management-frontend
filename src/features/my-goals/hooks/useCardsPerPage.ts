import { useState, useEffect } from 'react';

const getCardsPerPage = (width: number): number => {
    if (width >= 2350) {
        return 10;
    }
    if (width >= 1850) {
        return 8;
    }
    return 6;
};

export const useCardsPerPage = (): number => {
    const [cardsPerPage, setCardsPerPage] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            return getCardsPerPage(window.innerWidth);
        }
        return 6;
    });

    useEffect(() => {
        const handleResize = () => {
            setCardsPerPage(getCardsPerPage(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return cardsPerPage;
};
