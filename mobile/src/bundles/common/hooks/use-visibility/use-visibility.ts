import { useState } from 'react';

const useVisibility = (
    initialVisibility = false,
): { isVisible: boolean; toggleVisibility: () => void } => {
    const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

    const toggleVisibility = (): void => {
        setIsVisible((previous) => !previous);
    };

    return {
        isVisible,
        toggleVisibility,
    };
};

export { useVisibility };