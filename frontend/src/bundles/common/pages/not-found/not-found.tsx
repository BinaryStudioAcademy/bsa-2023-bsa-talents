import { Link, Logo, Typography } from '../../components/components.js';
import { AppRoute } from '../../enums/app-route.enum.js';
import { getValidClassNames } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

const NotFoundPage: React.FC = () => (
    <div className={getValidClassNames(styles.pageContainer)}>
        <div className={getValidClassNames(styles.header)}>
            <Logo />
        </div>
        <div className={getValidClassNames(styles.text)}>
            <Typography
                variant="body1"
                className={getValidClassNames(styles.description)}
            >
                The page you are looking for can’t be found.
            </Typography>
            <Typography
                variant="h1"
                className={getValidClassNames(styles.code)}
            >
                404
            </Typography>
        </div>
        <div className={getValidClassNames(styles.link)}>
            <Link to={AppRoute.ROOT}>Return to Main</Link>
        </div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
        <div className={getValidClassNames(styles.cube)}></div>
    </div>
);

export { NotFoundPage };
