import { Close } from '@mui/icons-material';
import { Chip as MUIChip } from '@mui/material';
import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
    label: string;
    onDelete?: () => void;
};

const Chip = ({ label, onDelete }: Properties): JSX.Element => {
    return (
        <MUIChip
            className={clsx(styles.chip, { [styles['delete-chip']]: onDelete })}
            label={label}
            onDelete={onDelete}
            deleteIcon={onDelete ? <Close /> : undefined}
        />
    );
};

export { Chip };
