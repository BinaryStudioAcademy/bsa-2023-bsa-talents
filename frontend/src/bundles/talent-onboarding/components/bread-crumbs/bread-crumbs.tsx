import { useCallback } from 'react';

import RoundedArrow from '~/assets/img/rounded-arrow.svg';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

import styles from './styles.module.scss';

const BreadCrumbs: React.FC = () => {
    const linkClass = useCallback(
        ({ isActive }: { isActive: boolean }) =>
            isActive ? `${styles.active}` : `${styles.inactive}`,
        [],
    );

    return (
        <nav className={styles.breadCrumbs}>
            <ul className={styles.breadCrumbsList}>
                <li className={styles.breadCrumbsListItem}>
                    <Link to={AppRoute.CANDIDATES} className={linkClass}>
                        Candidates
                    </Link>
                </li>
                <img
                    src={RoundedArrow}
                    className={styles.icon}
                    alt="rounded arrow"
                />
                <li>
                    {/*TODO: change link 'to' and link text */}
                    <Link to={AppRoute.CANDIDATE} className={linkClass}>
                        Middle Python Developer
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export { BreadCrumbs };
