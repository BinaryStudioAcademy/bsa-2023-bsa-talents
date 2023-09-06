import { MenuItem, Select as MuiSelect } from '@mui/material';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type Path,
    type PathValue,
} from 'react-hook-form';

import arrowIcon from '~/assets/img/select-arrow.svg';
import {
    useCallback,
    useFormController,
} from '~/bundles/common/hooks/hooks.js';

import { FormControl, FormLabel } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    options: { value: string | number; label: string }[];
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
};

const ArrowIcon = (): JSX.Element => {
    return <img className={styles.icon} src={arrowIcon} alt="arrow icon" />;
};

const Select = <T extends FieldValues>({
    control,
    name,
    options,
    label,
    multiple,
    hasError,
    isDisabled,
    placeholder = 'Placeholder',
}: Properties<T>): JSX.Element => {
    const FIRST_ELEMENT_INDEX = 0;
    const SECOND_ELEMENT_INDEX = 1;

    const { field } = useFormController({
        name,
        control,
        defaultValue: (multiple
            ? [options[FIRST_ELEMENT_INDEX].value]
            : options[FIRST_ELEMENT_INDEX].value) as PathValue<T, Path<T>>,
    });

    const renderPlaceholder = useCallback(
        (placeholder: string): JSX.Element => {
            return <span className={styles.placeholder}>{placeholder}</span>;
        },
        [],
    );

    const renderSelectedOptions = useCallback(
        (
            selected: string | string[],
            options: { value: string | number; label: string }[],
        ): JSX.Element[] => {
            return (
                Array.isArray(selected)
                    ? selected.slice(SECOND_ELEMENT_INDEX)
                    : [selected]
            )
                .filter((value) => value !== ' ')
                .map((value: string | number) => (
                    <span key={value} className={styles.option}>
                        {options.find((item) => item.value === value)?.label}
                        ,&nbsp;
                    </span>
                ));
        },
        [],
    );

    const renderSingleSelectedOption = useCallback(
        (
            selected: string,
            options: { value: string | number; label: string }[],
        ): JSX.Element => {
            return (
                <span className={styles.option}>
                    {options.find((item) => item.value === selected)?.label}
                </span>
            );
        },
        [],
    );

    const handleSelectChange = useCallback(
        (selected: PathValue<T, Path<T>>): React.ReactNode => {
            if (
                Array.isArray(selected) &&
                selected.length === SECOND_ELEMENT_INDEX &&
                selected[FIRST_ELEMENT_INDEX] === ' '
            ) {
                return renderPlaceholder(placeholder);
            }

            if (Array.isArray(selected)) {
                return renderSelectedOptions(selected, options);
            }

            if (selected === ' ') {
                return renderPlaceholder(placeholder);
            }

            if (selected !== ' ') {
                return renderSingleSelectedOption(selected, options);
            }
        },
        [
            options,
            placeholder,
            renderPlaceholder,
            renderSelectedOptions,
            renderSingleSelectedOption,
        ],
    );

    return (
        <FormControl
            className={styles.container}
            hasError={hasError}
            isDisabled={isDisabled}
        >
            {label && <FormLabel>{label}</FormLabel>}
            <MuiSelect
                {...field}
                multiple={multiple}
                IconComponent={ArrowIcon}
                className={styles.input}
                renderValue={handleSelectChange}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export { Select };
