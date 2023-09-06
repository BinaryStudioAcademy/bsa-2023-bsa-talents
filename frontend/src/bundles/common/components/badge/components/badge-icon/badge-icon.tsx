import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

import styles from '../../styles.module.scss';

type Properties = {
    icon?: ReactElement;
    iconClass?: string;
    isHRbadge?: boolean;
};

const BadgeIcon: React.FC<Properties> = ({ icon, iconClass, isHRbadge }) => {
    if (!icon) {
        return (
            <HeadphonesOutlined
                className={isHRbadge ? styles.bigHeadphones : iconClass}
            />
        );
    }
    return <SvgIcon className={iconClass}>{icon}</SvgIcon>;
};

export { BadgeIcon };
