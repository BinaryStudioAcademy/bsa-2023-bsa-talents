import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
};

const Header: React.FC<Properties> = ({ avatarUrl, isOnline }) => {
    return (
        <header className={styles.header}>
            <div className={styles.avatar}>
                <img src={avatarUrl} alt="User Avatar" />
                <div
                    className={`${styles.status} ${
                        isOnline ? styles.online : styles.offline
                    }`}
                />
            </div>
        </header>
    );
};

export { Header };
