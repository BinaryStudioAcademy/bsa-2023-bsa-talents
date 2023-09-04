import { type MenuItemProps } from '@mui/base/MenuItem';

import {
    Menu,
    MenuItem,
    Typography,
} from '~/bundles/common/components/components.js';

type Properties = MenuItemProps;

const HeaderUserMenu: React.FC<Properties> = () => {
    return (
        <Menu>
            <MenuItem>
                <Typography variant="h6">Settings</Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="h6">Sign Out</Typography>
            </MenuItem>
        </Menu>
    );
};

export { HeaderUserMenu };
