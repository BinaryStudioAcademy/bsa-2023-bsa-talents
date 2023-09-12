import { Close } from '@mui/icons-material';

import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    index: number;
    onClick: (index: number) => void;
};
const CloseIconButton: React.FC<Properties> = ({ index, onClick }) => {
    const clickHandler = useCallback(() => {
        onClick(index);
    }, [index, onClick]);

    return (
        <Close
            color="error"
            className={styles.closeIcon}
            onClick={clickHandler}
        />
    );
};

export { CloseIconButton };
