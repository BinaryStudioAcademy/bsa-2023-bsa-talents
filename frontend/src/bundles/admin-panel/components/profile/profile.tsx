import {
    Badge,
    Chip,
    Grid,
    Link,
    Typography,
} from '~/bundles/common/components/components.js';
import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';

import styles from './styles.module.scss';

const Profile: React.FC = () => {
    return (
        <Grid container className={styles.container}>
            <Grid container item className={styles.textInfo}>
                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Profile name (?)
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        Maria
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Salary expectations
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        1500$
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Job title
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        JS Engineer
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Experience
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        1-2 years
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Current Location
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        Astana
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Employment type
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        Remote, Freelancer
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Level of English
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        B1
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        I do not consider
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        -
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Preferred language of communication
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        -
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Project links
                    </Typography>
                    <Link to="/" className={styles.valueLink}>
                        link to BSA project
                    </Link>
                </Grid>
            </Grid>
            <Grid container item className={styles.labelsInfo}>
                <Grid container item className={styles.bsaBadges}>
                    <Typography variant="body1" className={styles.title}>
                        BSA badges
                    </Typography>
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score1'}
                        color={BadgeColors.YELLOW}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score2'}
                        color={BadgeColors.YELLOW}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score3'}
                        color={BadgeColors.YELLOW}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score4'}
                        color={BadgeColors.YELLOW}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score5'}
                        color={BadgeColors.YELLOW}
                    />
                </Grid>
                <Grid container item className={styles.hardSkills}>
                    <Typography variant="body1" className={styles.title}>
                        Hard Skills
                    </Typography>
                    <Chip label={'Java Script'} className={styles.chip} />
                    <Chip label={'Node.js'} className={styles.chip} />
                    <Chip label={'React'} className={styles.chip} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { Profile };
