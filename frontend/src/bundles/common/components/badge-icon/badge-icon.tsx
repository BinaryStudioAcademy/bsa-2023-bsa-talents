import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

type Properties = {
    icon: ReactElement | undefined;
    iconClass?: string;
};

const BadgeIcon: React.FC<Properties> = ({ icon, iconClass }) => {
    return icon ? (
        <SvgIcon className={iconClass}>{icon}</SvgIcon>
    ) : (
        <HeadphonesOutlined className={iconClass} />
    );
};

export { BadgeIcon };
