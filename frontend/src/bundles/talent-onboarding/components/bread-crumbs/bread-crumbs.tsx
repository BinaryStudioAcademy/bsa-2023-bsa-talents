import RoundedArrow from '~/assets/img/rounded-arrow.svg';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/app-route.enum.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

const BreadCrumbs: React.FC = () => {
    return (
        <nav className={styles.breadCrumbs}>
            <ul className={styles.breadCrumbsList}>
                <li>
                    <Link
                        to={AppRoute.CANDIDATES}
                        className={styles.breadCrumbLink}
                    >
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
                    <Link
                        to={AppRoute.CANDIDATE}
                        className={getValidClassNames(
                            styles.breadCrumbLink,
                            styles.breadCrumbLinkActive,
                        )}
                    >
                        Middle Python Developer
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export { BreadCrumbs };
