import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

type Properties = {
    icon?: ReactElement;
    iconClass?: string;
};

const BadgeIcon: React.FC<Properties> = ({ icon, iconClass }) => {
    if (!icon) {
        return <HeadphonesOutlined className={iconClass} />;
    }
    return <SvgIcon className={iconClass}>{icon}</SvgIcon>;
};

export { BadgeIcon };
