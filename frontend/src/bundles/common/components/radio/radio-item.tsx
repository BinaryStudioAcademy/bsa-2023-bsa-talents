import { Radio as MuiRadio, type RadioProps } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type RadioProperties = {
    isChecked: boolean;
    isDisabled?: boolean;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & RadioProps;

const radioIconClasses = getValidClassNames(styles['radio-icon']);
const radioCheckedIconClasses = getValidClassNames(
    styles['radio-icon'],
    styles['radio-icon-checked'],
);
const RadioIcon = <span className={radioIconClasses} />;
const RadioIconChecked = <span className={radioCheckedIconClasses} />;

const Radio: React.FC<RadioProperties> = ({
    isChecked,
    isDisabled,
    onChange,
    className = '',
    ...restProperties
}) => {
    const radioClasses = getValidClassNames(className);
    return (
        <MuiRadio
            checkedIcon={RadioIconChecked}
            icon={RadioIcon}
            className={radioClasses}
            checked={isChecked}
            disabled={isDisabled}
            onChange={onChange}
            {...restProperties}
        />
    );
};

export { Radio };
