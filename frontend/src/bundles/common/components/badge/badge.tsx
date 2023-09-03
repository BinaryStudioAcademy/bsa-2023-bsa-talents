import { Grid } from '@mui/material';
import { type ReactElement } from 'react';

import { BadgeColors } from '../../enums/enums.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import { type ValueOf } from '../../types/types.js';
import { BadgeIcon } from './components.js';
import styles from './styles.module.scss';

type Properties = {
    primaryText: string;
    description: string;
    secondText?: string;
    color?: ValueOf<typeof BadgeColors>;
    small?: boolean | undefined;
    icon?: ReactElement;
    iconClass?: string;
    HRbadge?: boolean;
};

const Badge: React.FC<Properties> = ({
    primaryText,
    description,
    secondText,
    color = BadgeColors.BLUE,
    small = false,
    icon,
    HRbadge,
}) => {
    const setClass = (classStandard: string, classSmall: string): string =>
        getValidClassNames(classStandard, small ? classSmall : '');

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexWrap="nowrap"
            gap="10px"
            className={
                HRbadge
                    ? setClass(styles.badge, styles.HRbadgeWrapper)
                    : setClass(styles.badge, styles.badgeSmall)
            }
            component="article"
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                alignSelf={small ? 'flex-start' : 'auto'}
                className={
                    HRbadge
                        ? styles.HRbadge
                        : setClass(styles.icon, styles.iconSmall)
                }
                style={{ backgroundColor: color }}
            >
                <BadgeIcon
                    icon={icon}
                    iconClass={setClass(
                        styles.iconDefaultStyle,
                        styles.iconDefaultStyleSmall,
                    )}
                    HRbadge={HRbadge}
                />
            </Grid>
            <Grid
                container
                flexGrow={1}
                flexDirection="column"
                justifyContent="space-between"
                flexWrap="nowrap"
                className={
                    HRbadge
                        ? getValidClassNames(
                              styles.content,
                              styles.HRbadgeContent,
                          )
                        : styles.content
                }
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
