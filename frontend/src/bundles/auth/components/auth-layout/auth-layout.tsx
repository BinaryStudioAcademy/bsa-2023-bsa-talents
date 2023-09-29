import { Grid, Logo } from '~/bundles/common/components/components.js';

import { AnimationText } from '../../enums/animation-text.enum.js';
import { AnimatedTextBlock } from '../components.js';
import styles from './styles.module.scss';

const GRID = {
    xs: 12,
    md: 6,
};

type Properties = {
    children?: React.ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ children }) => {
    return (
        <Grid container className={styles.container}>
            <Grid item xs={GRID.xs} md={GRID.md}>
                <Grid item className={styles.sellingPoint}>
                    <Logo className={styles.logo} hasLink />
                    <AnimatedTextBlock texts={AnimationText} />
                </Grid>
            </Grid>
            <Grid className={styles.formWrapper} item xs={GRID.xs} md={GRID.md}>
                <Grid item className={styles.wrapper}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { AuthLayout };
