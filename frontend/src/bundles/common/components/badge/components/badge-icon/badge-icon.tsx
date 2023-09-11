import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

type Properties = {
    icon?: React.ReactElement;
    iconClass?: string;
};

const BadgeIcon: React.FC<Properties> = ({ icon, iconClass }) => {
    if (!icon) {
        return <HeadphonesOutlined className={iconClass} />;
    }
    return <SvgIcon className={iconClass}>{icon}</SvgIcon>;
};

export { BadgeIcon };
