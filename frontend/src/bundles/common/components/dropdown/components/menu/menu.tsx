import { Menu as MUIMenu, type MenuProps } from '@mui/base/Menu';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuProps;

const Menu: React.FC<Properties> = ({ children }) => {
    return (
        <MUIMenu className={getValidClassNames(styles.menu)}>
            {children}
        </MUIMenu>
    );
};

export { type Properties as MenuProps };
export { Menu };
