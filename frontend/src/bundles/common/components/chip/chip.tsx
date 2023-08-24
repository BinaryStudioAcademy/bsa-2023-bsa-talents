import { Close } from '@mui/icons-material';
import { Chip as MUIChip } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    onDelete?: () => void;
};

const Chip: React.FC<Properties> = ({ label, onDelete }) => {
    const chipClassName = getValidClassNames(styles.chip, {
        [styles['delete-chip']]: onDelete,
    });

    return (
        <MUIChip
            className={chipClassName}
            label={label}
            onDelete={onDelete}
            deleteIcon={onDelete && <Close className={styles.icon} />}
        />
    );
};

export { Chip };
