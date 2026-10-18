import { useEffect } from 'react';

export const useScrollbarVisibility = () => {
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const handleScroll = () => {
            document.body.classList.add('is-scrolling');
            document.documentElement.classList.add('is-scrolling');

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                document.body.classList.remove('is-scrolling');
                document.documentElement.classList.remove('is-scrolling');
            }, 800);
        };

        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll, { capture: true });
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.body.classList.remove('is-scrolling');
            document.documentElement.classList.remove('is-scrolling');
        };
    }, []);
};
