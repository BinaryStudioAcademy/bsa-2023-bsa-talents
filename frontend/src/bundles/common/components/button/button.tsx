import { Button } from '@mui/material';

type Properties = {
    label: string;
    variant?: 'text' | 'outlined' | 'contained';
    type?: 'submit' | 'button';
};

const CustomButton: React.FC<Properties> = ({
    variant = 'contained',
    label,
    type = 'button',
}) => (
    <Button type={type} variant={variant}>
        {label}
    </Button> //TODO: Add other settings to a button, such as custom styles, color, etc
);

export { CustomButton };
