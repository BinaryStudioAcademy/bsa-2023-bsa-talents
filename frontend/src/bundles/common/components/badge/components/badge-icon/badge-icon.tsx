import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

import styles from '../../styles.module.scss';

type Properties = {
    icon?: ReactElement;
    iconClass?: string;
    HRbadge?: boolean;
};

const BadgeIcon: React.FC<Properties> = ({ icon, iconClass, HRbadge }) => {
    if (!icon) {
        return (
            <HeadphonesOutlined
                className={HRbadge ? styles.bigHeadphones : iconClass}
            />
        );
    }
    return <SvgIcon className={iconClass}>{icon}</SvgIcon>;
};

export { BadgeIcon };
