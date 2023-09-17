import { Box as MuiBox, Tabs as MuiTabs } from '@mui/material';
import { type BoxProps as MuiBoxProperties } from '@mui/material';

import {
    useCallback,
    useEffect,
    useLocation,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const NOT_FOUND_INDEX = -1;
const FIRST_ELEMENT_INDEX = 0;

type Properties = MuiBoxProperties & {
    children: React.ReactElement[];
};

const Tabs: React.FC<Properties> = ({ children }) => {
    const location = useLocation();

    const [value, setValue] = useState(FIRST_ELEMENT_INDEX);

    useEffect(() => {
        const tabIndex = children.findIndex(
            (child) => child.props.href === location.pathname,
        );
        setValue(tabIndex === NOT_FOUND_INDEX ? FIRST_ELEMENT_INDEX : tabIndex);
    }, [children, location.pathname]);

    const handleChange = useCallback(
        (event: React.SyntheticEvent, newValue: number): void => {
            setValue(newValue);
        },
        [],
    );

    return (
        <MuiBox>
            <MuiTabs
                className={styles.tabs}
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="nav tabs example"
            >
                {children}
            </MuiTabs>
        </MuiBox>
    );
};

export { Tabs };
