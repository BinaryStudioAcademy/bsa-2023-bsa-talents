import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select as MuiSelect,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import { useFormController } from '~/bundles/common/hooks/hooks.js';

import arrowIcon from '../../../../assets/img/select-arrow.svg';

type SelectProperties<T extends FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label: string;
    name: FieldPath<T>;
    options: { value: string | number; label: string }[];
    multiple?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectContainer = styled(FormControl)(({ theme }) => ({
    width: '100%',
    fontFamily: '"Inter", sans-serif',
}));

const SelectLabel = styled(InputLabel)({
    fontSize: '13px',
    fontFamily: '"Inter", sans-serif',
    fontStyle: 'normal',
    lineHeight: 'normal',
    top: '-5px',
    color: '#1f1e29',
    fontWeight: 500,
});

const shadowOpacity = 0.25;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectInput = styled(MuiSelect)(({ theme }) => ({
    height: '38px',
    padding: '10px 7px 12px 14px',
    color: '#90a3bf',
    fontWeight: 400,
    transition: 'border-color 0.3s, box-shadow 0.3s',
    '&:focus': {
        borderColor: '#80bdff',
        boxShadow: `0 0 0 0.2rem ${alpha('#007BFF', shadowOpacity)}`,
    },
}));

const ArrowIcon = styled('svg')({
    width: '20px',
    height: '20px',
    transform: 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    backgroundImage: `url(${arrowIcon})`,
});

const Select = <T extends FieldValues>({
    control,
    errors,
    label,
    name,
    options,
    multiple,
}: SelectProperties<T>): JSX.Element => {
    const firstElementIndex = 0;
    const { field } = useFormController({
        name,
        control,
        defaultValue: (multiple
            ? [options[firstElementIndex].value]
            : options[firstElementIndex].value) as PathValue<T, Path<T>>,
    });

    const error = errors[name]?.message;
    const hasError = Boolean(error);

    return (
        <SelectContainer error={hasError}>
            <SelectLabel>{label}</SelectLabel>
            <SelectInput
                {...field}
                multiple={multiple}
                IconComponent={ArrowIcon}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </SelectInput>
            {hasError && <FormHelperText>{error as string}</FormHelperText>}
        </SelectContainer>
    );
};

export { Select };
