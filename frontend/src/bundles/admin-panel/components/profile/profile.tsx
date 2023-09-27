import {
    Badge,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

import { type UserDetailsFullResponseDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    userDetails: UserDetailsFullResponseDto;
};

const Profile: React.FC<Properties> = ({ userDetails }) => {
    return (
        <Grid container className={styles.container}>
            <Grid container item className={styles.textInfo}>
                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Profile name (?)
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.profileName}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Salary expectations
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.salaryExpectation}$
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Job title
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.jobTitle}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Experience
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.experienceYears} years
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Current Location
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.location}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Employment type
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.employmentType?.join(',\n')}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Level of English
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.englishLevel}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        I do not consider
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.notConsidered?.join(', ') ?? '-'}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Preferred language of communication
                    </Typography>
                    <Typography variant="body1" className={styles.value}>
                        {userDetails.preferredLanguages?.join(', ') ?? '-'}
                    </Typography>
                </Grid>

                <Grid container item className={styles.row}>
                    <Typography variant="body1" className={styles.name}>
                        Project links
                    </Typography>
                    {userDetails.projectLinks?.map((link) => {
                        return (
                            <a
                                href={link}
                                key={link}
                                className={styles.valueLink}
                            >
                                link to BSA project
                            </a>
                        );
                    })}
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
                        color={'#274f8d'}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score2'}
                        color={'#EE2A64'}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score3'}
                        color={'#FFD231'}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score4'}
                        color={'#D32AEE'}
                    />{' '}
                    <Badge
                        isSmall
                        primaryText={'4.2'}
                        secondText={'/5'}
                        description={'Average project score5'}
                        color={'#21BA67'}
                    />
                </Grid>
                <Grid container item className={styles.hardSkills}>
                    <Typography variant="body1" className={styles.title}>
                        Hard Skills
                    </Typography>
                    {userDetails.talentHardSkills.map((hardSkill) => {
                        return (
                            <Chip
                                key={hardSkill.name}
                                label={hardSkill.name}
                                className={styles.chip}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export { Profile };
