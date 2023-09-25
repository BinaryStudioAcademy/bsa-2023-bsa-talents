import { useCallback } from 'react';

import RoundedArrow from '~/assets/img/rounded-arrow.svg';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';

import styles from './styles.module.scss';

type Properties = {
    profileName?: string;
};
const BreadCrumbs: React.FC<Properties> = ({ profileName }) => {
    const linkClass = useCallback(
        ({ isActive }: { isActive: boolean }) =>
            isActive ? `${styles.active}` : `${styles.inactive}`,
        [],
    );

    return (
        <nav className={styles.breadCrumbs}>
            <ul className={styles.breadCrumbsList}>
                <li>
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
                    <Link to={AppRoute.SAME_PAGE} className={linkClass}>
                        {profileName}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export { BreadCrumbs };
