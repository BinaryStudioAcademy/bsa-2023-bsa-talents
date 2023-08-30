import { Header, Sidebar } from '../../components/components.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    avatarUrl: string;
    isOnline: boolean;
    children: React.ReactNode;
};

const PageLayout: React.FC<Properties> = ({
    avatarUrl,
    isOnline,
    children,
}) => (
    <div className={getValidClassNames(styles.pageContainer)}>
        <Sidebar />
        <div className={getValidClassNames(styles.mainContainer)}>
            <Header avatarUrl={avatarUrl} isOnline={isOnline} />
            <div className={getValidClassNames(styles.mainContent)}>
                {children}
            </div>
        </div>
    </div>
);

export { PageLayout };
