import { Logo } from '../components.js';
import styles from './styles.module.scss';

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <Logo className={styles.logo} isCollapsed />
        </div>
    );
};

export { Loader };
