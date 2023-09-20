import { Chip as MUIChip } from '@mui/material';

import styles from './styles.module.scss';

const VerificationLabel: React.FC = () => {
    return (
        <MUIChip
            className={styles.verificationLabel}
            label="Waiting for approval"
        />
    );
};

export { VerificationLabel };
