import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from '../../styles.module.scss';

type Properties = {
    icon?: ReactElement;
    iconClass?: string;
    isRoundedIcon?: boolean;
    isFifthStep?: boolean;
};

const BadgeIcon: React.FC<Properties> = ({
    icon,
    iconClass,
    isRoundedIcon,
    isFifthStep,
}) => {
    if (!icon) {
        return (
            <HeadphonesOutlined
                className={getValidClassNames(
                    isRoundedIcon ? styles.middleHeadphones : iconClass,
                    isFifthStep ? styles.bigHeadphones : '',
                )}
            />
        );
    }
    return <SvgIcon className={iconClass}>{icon}</SvgIcon>;
};

export { BadgeIcon };
