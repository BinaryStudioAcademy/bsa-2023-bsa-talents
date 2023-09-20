import { Close } from '@mui/icons-material';

import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
    index: number;
    onClick: (index: number) => void;
};
const CloseIconButton: React.FC<Properties> = ({ index, onClick }) => {
    const handleClick = useCallback(() => {
        onClick(index);
    }, [index, onClick]);

    return <Close className={styles.closeIcon} onClick={handleClick} />;
};

export { CloseIconButton };
