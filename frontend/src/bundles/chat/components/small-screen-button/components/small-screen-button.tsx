import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Properties = {
    isOpen: boolean;
    onClick: () => void;
    children?: React.ReactNode;
};

const SmallScreenButton: React.FC<Properties> = ({
    isOpen,
    onClick,
    children,
}) => {
    return (
        <IconButton onClick={onClick}>
            {isOpen ? <Close fontSize="large" /> : children}
        </IconButton>
    );
};

export { SmallScreenButton, type Properties as SmallScreenButtonProperties };
