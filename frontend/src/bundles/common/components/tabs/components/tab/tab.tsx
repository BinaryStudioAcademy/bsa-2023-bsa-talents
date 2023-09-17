import { Tab as MuiTab } from '@mui/material';

import { useCallback, useNavigate } from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

type LinkTabProperties = {
    label?: string;
    href?: string;
};

const Tab: React.FC<LinkTabProperties> = (props) => {
    const navigate = useNavigate();

    const handleClick = useCallback(
        (event: React.MouseEvent): void => {
            event.preventDefault();
            if (props.href) {
                navigate(props.href);
            }
        },
        [navigate, props.href],
    );

    return (
        <MuiTab
            className={styles.tab}
            component="a"
            onClick={handleClick}
            {...props}
        />
    );
};

export { Tab };
