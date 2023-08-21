import {
    Checkbox as CheckboxMUI,
    FormControlLabel,
    type SxProps,
    type Theme,
} from '@mui/material';

type Properties = {
    label?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    required?: boolean;
    value?: string;
    size?: 'small' | 'medium';
    sx?: SxProps<Theme>;
};

const Checkbox: React.FC<Properties> = ({
    label = '',
    defaultChecked = false,
    checked,
    disabled = false,
    required = false,
    value = '',
    size,
    sx,
}) => {
    return (
        <FormControlLabel
            control={
                <CheckboxMUI
                    defaultChecked={defaultChecked}
                    checked={checked}
                    required={required}
                    value={value}
                    disabled={disabled}
                    size={size}
                    sx={
                        sx ?? {
                            color: '#D5DCE8',
                            '&.Mui-checked': {
                                color: disabled ? '#D5DCE8' : '#274F8D',
                            },
                            '&.Mui-hover': { background: 'none' },
                        }
                    }
                />
            }
            label={label}
        />
    );
};

export { Checkbox };
