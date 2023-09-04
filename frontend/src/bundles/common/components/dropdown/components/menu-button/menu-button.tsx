import {
    MenuButton as MUIMenuButton,
    type MenuButtonProps,
} from '@mui/base/MenuButton';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = MenuButtonProps;

const MenuButton: React.FC<Properties> = ({ children }) => {
    return (
        <MUIMenuButton
            className={getValidClassNames(
                styles.resetButton,
                styles.menuButton,
            )}
        >
            {children}
        </MUIMenuButton>
    );
};

export { type Properties as MenuButtonProps };
export { MenuButton };
