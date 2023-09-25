import { IconButton as MuiIconButton } from '@mui/material';

type Properties = {
    onClick?: () => void;
    children?: React.ReactNode;
};

const IconButton: React.FC<Properties> = ({ children, onClick }) => {
    return <MuiIconButton onClick={onClick}>{children}</MuiIconButton>;
};

export { IconButton };
