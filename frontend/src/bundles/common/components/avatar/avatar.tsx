import { Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    userFullName: string;
    url?: string;
    size?: 'small' | 'medium';
};

const Avatar: React.FC<Properties> = ({
    url,
    size = 'small',
    userFullName,
}) => {
    const avatarClasses = getValidClassNames(styles.avatar, styles[size]);

    const [userName, userSurname] = userFullName.split(' ');
    const firstLetterIndex = 0;
    const userNameAbbreviation = userSurname
        ? `${userName[firstLetterIndex].toUpperCase()}${userSurname[
              firstLetterIndex
          ].toUpperCase()}`
        : `${userName[firstLetterIndex].toUpperCase()}`;

    return url ? (
        <img className={avatarClasses} src={url} alt="User avatar" />
    ) : (
        <Typography variant="caption" className={avatarClasses}>
            {userNameAbbreviation}
        </Typography>
    );
};

export { Avatar };
