import {
    FormControlLabel as MUIFormControlLabel,
    type FormControlLabelProps as MUIFormControlLabelProperties,
} from '@mui/material';

type Properties = MUIFormControlLabelProperties & {
    className?: string;
    control: React.ReactElement;
    label: string;
};

const FormControlLabel: React.FC<Properties> = ({
    control,
    label,
    className = '',
    ...props
}) => (
    <MUIFormControlLabel
        {...props}
        label={label}
        control={control}
        className={className}
    />
);

export { FormControlLabel };
