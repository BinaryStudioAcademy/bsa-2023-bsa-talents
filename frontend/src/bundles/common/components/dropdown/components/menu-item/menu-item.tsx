import {
    MenuItem as MUIMenuItem,
    type MenuItemProps,
} from '@mui/base/MenuItem';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuItemProps;

const MenuItem: React.FC<Properties> = ({ children, className, ...props }) => {
    return (
        <MUIMenuItem
            className={getValidClassNames(styles.menuItem, className)}
            {...props}
        >
            {children}
        </MUIMenuItem>
    );
};

export { type Properties as MenuItemProps };
export { MenuItem };
