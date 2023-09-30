import { type UserDetails } from '~/bundles/chat/types/user-details/user-details.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';

import styles from '../styles.module.scss';

type Properties = {
    talent: UserDetails | null;
};

const CompanyTalent: React.FC<Properties> = ({ talent }) => {
    return (
        <Grid className={styles.contentWrapper}>
            <Grid className={styles.content}>
                <Typography className={styles.contentHeading} variant="h6">
                    English level
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.englishLevel}
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Experience
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.experienceYears} years
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Location
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.location}
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Salary expectation
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.salaryExpectation} $
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Preferred languages
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.preferredLanguages?.toString()}
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Employment types
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.employmentType?.toString()}
                </Typography>
                <Typography className={styles.contentHeading} variant="h6">
                    Not considered
                </Typography>
                <Typography className={styles.about} variant="body1">
                    {talent?.notConsidered?.toString()}
                </Typography>
            </Grid>
        </Grid>
    );
};

export { CompanyTalent };
