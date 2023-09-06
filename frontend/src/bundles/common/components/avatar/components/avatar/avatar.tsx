import { Avatar as MUIAvatar, type AvatarProps } from '@mui/material';

import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = AvatarProps & {
    isSmall?: boolean;
};

const Avatar: React.FC<Properties> = ({
    isSmall = false,
    className,
    ...props
}) => {
    return (
        <MUIAvatar
            className={getValidClassNames(
                className,
                styles.avatar,
                isSmall && styles.small,
            )}
            {...props}
        ></MUIAvatar>
    );
};

export { type Properties as AvatarProperties };
export { Avatar };
