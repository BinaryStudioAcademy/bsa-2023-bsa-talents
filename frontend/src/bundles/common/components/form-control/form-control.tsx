import {
    FilledInput,
    FormControl as MUIFormControl,
    FormHelperText,
    Input,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

const InputVariantTypes = {
    FILLED: 'filled',
    OUTLINED: 'outlined',
    STANDART: 'standard',
} as const;

type FormControlVariants =
    (typeof InputVariantTypes)[keyof typeof InputVariantTypes];

type Properties = {
    name: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // TODO: change after the color scheme is merged
    variant?: FormControlVariants;
    isError?: boolean;
    isDisabled?: boolean;

    label?: string;
    value?: string;
    helperText?: string;
    inputLabelProps?: React.ComponentProps<typeof InputLabel>;
    formHelperTextProps?: React.ComponentProps<typeof FormHelperText>;
};

const FormControl: React.FC<Properties> = ({
    name,
    color = 'primary',
    variant = 'standard',
    isError = false,
    isDisabled = false,
    label = '',
    value = '',
    helperText = '',
    inputLabelProps,
    formHelperTextProps,
}) => {
    const formInputId = `${name}-form-input`;
    const formHelperTextId = `${name}-form-helper-text`;

    const renderVariantInput = (
        variant: FormControlVariants,
    ): React.ReactNode => {
        switch (variant) {
            case InputVariantTypes.FILLED: {
                return (
                    <FilledInput
                        id={formInputId}
                        aria-describedby={formHelperTextId}
                        defaultValue={value}
                    />
                );
            }
            case InputVariantTypes.OUTLINED: {
                return (
                    <OutlinedInput
                        id={formInputId}
                        aria-describedby={formHelperTextId}
                        label={label}
                        defaultValue={value}
                    />
                );
            }
            case InputVariantTypes.STANDART: {
                return (
                    <Input
                        id={formInputId}
                        aria-describedby={formHelperTextId}
                        defaultValue={value}
                    />
                );
            }
            default: {
                return null;
            }
        }
    };

    return (
        <MUIFormControl
            variant={variant}
            color={color}
            error={isError}
            disabled={isDisabled}
        >
            {label && (
                <InputLabel htmlFor={formInputId} {...inputLabelProps}>
                    {label}
                </InputLabel>
            )}

            {renderVariantInput(variant)}

            {helperText && (
                <FormHelperText id={formHelperTextId} {...formHelperTextProps}>
                    {helperText}
                </FormHelperText>
            )}
        </MUIFormControl>
    );
};

export { FormControl };
