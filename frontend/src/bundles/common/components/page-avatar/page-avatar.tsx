import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    src?: string;
    small?: boolean;
};

const setImageStyle = (imageLink: string | undefined): React.CSSProperties => {
    return imageLink
        ? { backgroundImage: `url("${imageLink}")` }
        : { backgroundColor: '#7A77FD' };
};

const PageAvatar: React.FC<Properties> = ({ src, small }) => {
    return (
        <div
            className={getValidClassNames(
                styles.avatar,
                small ? styles.avatarSmall : styles.avatarDefault,
            )}
            style={setImageStyle(src)}
        ></div>
    );
};

export { type Properties as PageAvatarProperties };
export { PageAvatar };
