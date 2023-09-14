import { type FormLabelProps as MUIFormLabelProperties } from '@mui/material';
import { FormLabel as MUIFormLabel } from '@mui/material';

import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = MUIFormLabelProperties;

const FormLabel: React.FC<Properties> = ({
    children,
    className = '',
    ...props
}) => (
    <MUIFormLabel
        className={getValidClassNames(styles.label, className)}
        {...props}
    >
        {children}
    </MUIFormLabel>
);

export { FormLabel };
