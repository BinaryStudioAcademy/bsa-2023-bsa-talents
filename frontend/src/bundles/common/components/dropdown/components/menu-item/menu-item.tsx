import {
    MenuItem as MUIMenuItem,
    type MenuItemProps,
} from '@mui/base/MenuItem';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuItemProps;

const MenuItem: React.FC<Properties> = ({ children }) => {
    return (
        <MUIMenuItem className={getValidClassNames(styles.menuItem)}>
            {children}
        </MUIMenuItem>
    );
};

export { type Properties as MenuItemProps };
export { MenuItem };
