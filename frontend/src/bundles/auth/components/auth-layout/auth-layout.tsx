import {
    Grid,
    Logo,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
    children?: React.ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ children }) => {
    return (
        <>
            <Grid container className={styles.container}>
                <Grid item xs={12} md={6}>
                    <Grid item className={styles.sellingPoint}>
                        <Logo className={styles.logo} withLink />
                        <Typography
                            className={styles.animatedTextWrapper}
                            variant="h1"
                        >
                            <Grid className={styles.message}>
                                <span
                                    className={getValidClassNames(
                                        styles.messageOne,
                                        styles.text,
                                    )}
                                >
                                    <span className={styles.text}>
                                        Find the top talent{' '}
                                    </span>
                                    <span className={styles.text}>
                                        for your business{' '}
                                    </span>
                                </span>
                                <span
                                    className={getValidClassNames(styles.text)}
                                >
                                    Start your career easily.{' '}
                                </span>
                            </Grid>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid className={styles.formWrapper} item xs={12} md={6}>
                    <Grid item className={styles.wrapper}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export { AuthLayout };
