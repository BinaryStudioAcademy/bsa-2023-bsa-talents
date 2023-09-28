import { type ValueOf } from 'shared/build/index.js';

import { type AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { Link } from '../../components.js';
import { SidebarNotification } from '../sidebar-notification/sidebar-notification.js';
import styles from '../styles.module.scss';

type Properties = {
    link: ValueOf<typeof AppRoute>;
    icon: JSX.Element;
    name: string;
};

const SidebarItem: React.FC<Properties> = ({ link, icon, name }) => {
    const [isNotificationVisible, setNotificationVisible] = useState(false);

    const { talentOnBoarding, employerOnBoarding } = useAppSelector(
        (state: RootReducer) => state,
    );

    const isApproved =
        talentOnBoarding.isApproved ?? employerOnBoarding.isApproved;

    const handleToggleNotification = useCallback(() => {
        if (!isApproved) {
            setNotificationVisible(!isNotificationVisible);
        }
    }, [isNotificationVisible, isApproved]);

    return (
        <li className={isApproved ? '' : styles.listItem}>
            {!isApproved && (
                <button
                    className={styles.listButton}
                    onClick={handleToggleNotification}
                ></button>
            )}
            <Link to={link}>
                {icon}
                <p className={styles.title}>{name}</p>
            </Link>
            {isNotificationVisible && (
                <SidebarNotification
                    isVisible={isNotificationVisible}
                    handleClose={handleToggleNotification}
                />
            )}
        </li>
    );
};

export { SidebarItem };
