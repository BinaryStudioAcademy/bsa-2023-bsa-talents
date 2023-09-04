import { Grid } from '~/bundles/common/components/components.js';
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
                    <Grid item className={styles['selling-point']}>
                        <div className={styles.logo}></div>{' '}
                        {/* TODO: Change to Logo component*/}
                        <div className={styles.message}>
                            <div
                                className={getValidClassNames(
                                    styles['message-1'],
                                    styles.text,
                                )}
                            >
                                Find the top talent for your business{' '}
                                {/* TODO: Animate message */}
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Grid className={styles['form-wrapper']} item xs={12} md={6}>
                    <Grid item className={styles.wrapper}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export { AuthLayout };
