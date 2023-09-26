import { Grid } from '@mui/material';
import { type ReactElement } from 'react';

import { BadgeColors } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { type ValueOf } from '~/bundles/common/types/types.js';

import { BadgeIcon } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
    primaryText: string;
    description: string;
    secondText?: string;
    color?: ValueOf<typeof BadgeColors>;
    isSmall?: boolean;
    icon?: ReactElement;
    iconClass?: string;
    isRoundedIcon?: boolean;
    isFifthStep?: boolean;
};

const Badge: React.FC<Properties> = ({
    primaryText,
    description,
    secondText,
    color = BadgeColors.BLUE,
    isSmall = false,
    icon,
    isRoundedIcon,
    isFifthStep,
}) => {
    const setClass = (classStandard: string, classSmall: string): string =>
        getValidClassNames(classStandard, isSmall ? classSmall : '');

    let finalBadgeClass;
    let finalBadgeWrapperClass;
    if (isRoundedIcon) {
        finalBadgeClass = styles.roundedIconBadge;
        finalBadgeWrapperClass = styles.roundedIconBadgeWrapper;
    } else {
        finalBadgeClass = isFifthStep ? styles.bigIconBackground : styles.icon;
        finalBadgeWrapperClass = isFifthStep
            ? styles.middleBadge
            : styles.badgeSmall;
    }

    const badgeClass = setClass(finalBadgeClass, styles.iconSmall);

    const badgeWrapperClass = setClass(styles.badge, finalBadgeWrapperClass);

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexWrap="nowrap"
            gap="10px"
            className={badgeWrapperClass}
            component="article"
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                alignSelf={isSmall && !isFifthStep ? 'flex-start' : 'auto'}
                className={badgeClass}
                style={{ backgroundColor: color }}
            >
                <BadgeIcon
                    isFifthStep={isFifthStep}
                    icon={icon}
                    iconClass={setClass(
                        styles.iconDefaultStyle,
                        styles.iconDefaultStyleSmall,
                    )}
                    isRoundedIcon={isRoundedIcon}
                />
            </Grid>
            <Grid
                container
                flexGrow={1}
                flexDirection="column"
                justifyContent="space-between"
                flexWrap="nowrap"
                className={getValidClassNames(
                    styles.content,
                    isRoundedIcon ? styles.roundedIconBadgeContent : '',
                )}
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
