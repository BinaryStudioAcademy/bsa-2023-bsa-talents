import { HeadphonesOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import { type ReactElement } from 'react';

import { BadgeColors } from '../../enums/badge-colors.enum.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    primaryText: string;
    description: string;
    secondText?: string;
    color?: keyof typeof BadgeColors;
    size?: keyof typeof Size;
    icon?: ReactElement;
};

type IconProperties = {
    icon: ReactElement | undefined;
    iconClass?: string;
};

const Size = {
    DEFAULT: 'DEFAULT',
    SMALL: 'SMALL',
};

const Icon: React.FC<IconProperties> = ({ icon, iconClass }) => {
    return icon ? (
        <SvgIcon className={iconClass}>{icon}</SvgIcon>
    ) : (
        <HeadphonesOutlined className={iconClass} />
    );
};

const Badge: React.FC<Properties> = ({
    primaryText,
    description,
    secondText,
    color = 'BLUE',
    size = 'DEFAULT',
    icon,
}) => {
    const isSmall = Size[size] === Size.SMALL;
    const setClass = (classStandart: string, classSmall: string): string =>
        getValidClassNames(classStandart, isSmall ? classSmall : '');

    return (
        <article
            className={setClass(
                styles.badgeContainer,
                styles.badgeContainerSmall,
            )}
        >
            <div
                className={setClass(
                    styles.iconContainer,
                    styles.iconContainerSmall,
                )}
                style={{ backgroundColor: BadgeColors[color] }}
            >
                <Icon
                    icon={icon}
                    iconClass={setClass(
                        styles.iconDefaultStyle,
                        styles.iconDefaultStyleSmall,
                    )}
                />
            </div>
            <div className={styles.content}>
                <div className={setClass(styles.title, styles.titleSmall)}>
                    <span>{primaryText}</span>
                    {secondText && (
                        <span className={styles.titleTail}>{secondText}</span>
                    )}
                </div>
                <span
                    className={setClass(
                        styles.description,
                        styles.descriptionSmall,
                    )}
                >
                    {description}
                </span>
            </div>
        </article>
    );
};

export { Badge };
