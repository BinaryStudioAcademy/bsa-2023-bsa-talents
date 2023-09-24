import { CheckRounded as CheckIcon } from '@mui/icons-material';
import {
    Checkbox as CheckboxMUI,
    type CheckboxProps,
    FormControlLabel,
} from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = CheckboxProps & {
    label?: string | React.ReactNode;
    isDisabled?: boolean;
    isDefaultChecked?: boolean;
    isChecked?: boolean;
    isRequired?: boolean;
};

const icon = <span className={styles.checkboxIcon} />;
const iconChecked = (
    <span
        className={getValidClassNames(
            styles.checkboxIcon,
            styles.checkboxIconChecked,
        )}
    >
        <CheckIcon />
    </span>
);

const Checkbox: React.FC<Properties> = ({
    label,
    isChecked,
    isDefaultChecked,
    isDisabled,
    isRequired,
    className,
    ...props
}) => {
    return label ? (
        <FormControlLabel
            control={
                <CheckboxMUI
                    {...props}
                    defaultChecked={isDefaultChecked}
                    checked={isChecked}
                    required={isRequired}
                    disabled={isDisabled}
                    icon={icon}
                    checkedIcon={iconChecked}
                />
            }
            className={className}
            label={label}
        />
    ) : (
        <CheckboxMUI
            {...props}
            defaultChecked={isDefaultChecked}
            checked={isChecked}
            required={isRequired}
            disabled={isDisabled}
            className={className}
            icon={icon}
            checkedIcon={iconChecked}
        />
    );
};

export { Checkbox };
