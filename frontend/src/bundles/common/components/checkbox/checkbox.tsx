import {
    Checkbox as CheckboxMUI,
    type CheckboxProps,
    FormControlLabel,
} from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = CheckboxProps & {
    label?: string;
    isDisabled?: boolean;
    isDefaultChecked?: boolean;
    isChecked?: boolean;
    isRequired?: boolean;
};

const Checkbox: React.FC<Properties> = ({
    label = '',
    isChecked,
    isDefaultChecked,
    isDisabled = false,
    isRequired = false,
    value = '',
    className = styles.primary,
}) => {
    const combinedClasses = getValidClassNames(className)
        .split(' ')
        .map((className) => {
            return styles[className] || className;
        })
        .join(' ');

    return (
        <FormControlLabel
            control={
                <CheckboxMUI
                    defaultChecked={isDefaultChecked}
                    checked={isChecked}
                    required={isRequired}
                    value={value}
                    disabled={isDisabled}
                />
            }
            className={combinedClasses}
            label={label}
        />
    );
};

export { Checkbox };
