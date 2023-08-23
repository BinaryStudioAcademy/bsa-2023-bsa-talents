import { CircularProgress } from '@mui/material';

import styles from './styles.module.scss';

type Properties = {
    size?: number;
    variant?: 'determinate' | 'indeterminate';
    value?: number;
};

const Loader = ({
    size,
    variant = 'indeterminate',
    value,
}: Properties): JSX.Element => {
    return (
        <div className={styles.loader}>
            <CircularProgress size={size} variant={variant} value={value} />
        </div>
    );
};

export { Loader };
