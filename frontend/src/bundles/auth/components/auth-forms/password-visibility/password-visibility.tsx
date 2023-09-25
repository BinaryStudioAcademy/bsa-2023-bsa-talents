import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type Properties = {
    handleClick: () => void;
    showPassword: boolean;
};

const PasswordVisibility: React.FC<Properties> = ({
    handleClick,
    showPassword,
}): JSX.Element => {
    return (
        <IconButton
            aria-label="toggle password visibility"
            onClick={handleClick}
            edge="end"
        >
            {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    );
};

export { PasswordVisibility };
