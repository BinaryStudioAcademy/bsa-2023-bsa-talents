import { Grid } from '@mui/material';
import { type ReactElement } from 'react';

import { BadgeColors } from '../../enums/enums.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import { BadgeIcon } from '../badge-icon/badge-icon.js';
import styles from './styles.module.scss';

type Properties = {
    primaryText: string;
    description: string;
    secondText?: string;
    color?: keyof typeof BadgeColors;
    size?: keyof typeof Size;
    icon?: ReactElement;
};

const Size = {
    DEFAULT: 'DEFAULT',
    SMALL: 'SMALL',
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
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexWrap="nowrap"
            gap="10px"
            className={setClass(styles.badge, styles.badgeSmall)}
            component="article"
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                alignSelf={isSmall ? 'flex-start' : 'auto'}
                className={setClass(styles.icon, styles.iconSmall)}
                style={{ backgroundColor: BadgeColors[color] }}
            >
                <BadgeIcon
                    icon={icon}
                    iconClass={setClass(
                        styles.iconDefaultStyle,
                        styles.iconDefaultStyleSmall,
                    )}
                />
            </Grid>
            <Grid
                container
                flexGrow={1}
                flexDirection="column"
                justifyContent="space-between"
                flexWrap="nowrap"
                className={styles.content}
            >
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
            </Grid>
        </Grid>
    );
};

export { Badge };
