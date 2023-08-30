import { Radio as RadioMUI } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    value?: string;
    isChecked?: boolean;
    isDisabled?: boolean;
    isDisableRipple?: boolean;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const radioClasses = getValidClassNames(styles['radio-icon'], {
    [styles.radioHover]: true,
});
const radioCheckedClasses = getValidClassNames(
    styles['radio-icon'],
    styles['radio-icon-checked'],
);
const RadioIcon = <span className={radioClasses} />;
const RadioIconChecked = <span className={radioCheckedClasses} />;

const Radio: React.FC<Properties> = ({
    value,
    isChecked,
    isDisabled,
    isDisableRipple,
    className,
    onChange,
}) => {
    return (
        <RadioMUI
            value={value}
            checkedIcon={RadioIconChecked}
            icon={RadioIcon}
            checked={isChecked}
            disabled={isDisabled}
            disableRipple={isDisableRipple}
            className={className}
            onChange={onChange}
        />
    );
};

export { Radio };
