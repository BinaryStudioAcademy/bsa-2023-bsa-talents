import { CircularProgress } from '@mui/material';

import styles from './styles.module.scss';

type Properties = {
    size?: number;
    variant?: 'determinate' | 'indeterminate';
    value?: number;
};

const Loader: React.FC<Properties> = ({
    size,
    variant = 'indeterminate',
    value,
}) => {
    return (
        <div className={styles.loader}>
            <CircularProgress size={size} variant={variant} value={value} />
        </div>
    );
};

export { Loader };
