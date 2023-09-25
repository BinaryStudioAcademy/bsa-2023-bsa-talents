import { useState } from 'react';

const useVisibility = (
    initialVisibility = false,
): { isVisible: boolean; handleToggleVisibility: () => void } => {
    const [isVisible, setIsVisible] = useState<boolean>(initialVisibility);

    const handleToggleVisibility = (): void => {
        setIsVisible((previous) => !previous);
    };

    return {
        isVisible,
        handleToggleVisibility,
    };
};

export { useVisibility };
