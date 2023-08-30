import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    src?: string;
    small?: boolean;
};

const COLOR_DEG = 360;
const getRandomColor = (): string => {
    return `hsl(${Math.floor(Math.random() * COLOR_DEG)}deg 97.1% 72.94%)`;
};

const setImageStyle = (imageLink: string | undefined): React.CSSProperties => {
    return imageLink
        ? { backgroundImage: `url("${imageLink}")` }
        : { backgroundColor: getRandomColor() };
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
