import { useState } from 'react';

const useVisibility = (
    hasInitialVisibility = false,
): { isVisible: boolean; toggleVisibility: () => void } => {
    const [isVisible, setIsVisible] = useState<boolean>(hasInitialVisibility);

    const toggleVisibility = (): void => {
        setIsVisible((previous) => !previous);
    };

    return {
        isVisible,
        toggleVisibility,
    };
};

export { useVisibility };
