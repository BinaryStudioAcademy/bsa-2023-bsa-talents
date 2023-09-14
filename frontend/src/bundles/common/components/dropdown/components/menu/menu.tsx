import { Menu as MUIMenu, type MenuProps } from '@mui/base/Menu';
import { MenuList as MUIMenuList } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuProps;

const Menu: React.FC<Properties> = ({ children, className, ...props }) => {
    return (
        <MUIMenu
            className={getValidClassNames(styles.menu, className)}
            {...props}
        >
            <MUIMenuList className={styles.menuList}>{children}</MUIMenuList>
        </MUIMenu>
    );
};

export { type Properties as MenuProps };
export { Menu };
