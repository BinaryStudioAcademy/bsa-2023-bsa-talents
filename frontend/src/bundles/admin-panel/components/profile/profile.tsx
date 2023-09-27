import {
    Avatar,
    Badge,
    Chip,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

import { type UserDetailsFullResponseDto } from '../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    userDetails: UserDetailsFullResponseDto;
    selectedRole: string;
};

const Profile: React.FC<Properties> = ({ userDetails, selectedRole }) => {
    return (
        <Grid container className={styles.container}>
            <Grid
                container
                item
                className={
                    selectedRole === 'talents'
                        ? styles.textInfo
                        : styles.employerTextInfo
                }
            >
                {selectedRole === 'talents' ? (
                    <>
                        <Grid className={styles.textInfo}>
                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Profile name
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Maria
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Salary expectations
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    1500$
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Job title
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    JS Engineer
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Experience
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    1-2 years
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid className={styles.textInfo}>
                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Current Location
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Astana
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Employment type
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Remote, Freelancer
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Level of English
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    B1
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    I do not consider
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    -
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Preferred language of communication
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    -
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Project links
                                </Typography>
                                <a href="/" className={styles.valueLink}>
                                    link to BSA project
                                </a>
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid className={styles.textInfo}>
                            <Avatar className={styles.companyLogo} />

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Employer position
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Position
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Company name
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Rickardo
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid className={styles.textInfo}>
                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Company website
                                </Typography>
                                <a
                                    href="https://www.google.com"
                                    className={styles.valueLink}
                                >
                                    Website link
                                </a>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Location
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Ukraine
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Description
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className={styles.value}
                                >
                                    Description
                                </Typography>
                            </Grid>

                            <Grid container item className={styles.row}>
                                <Typography
                                    variant="body1"
                                    className={styles.name}
                                >
                                    Linkedin Link
                                </Typography>
                                <a
                                    href="https://www.google.com"
                                    className={styles.valueLink}
                                >
                                    Linkedin link
                                </a>
                            </Grid>
                        </Grid>
                    </>
                )}
                ask/bt-701-create-component-for-employer-in-admin-user
            </Grid>

            {selectedRole === 'talents' && (
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
                        />
                        <Badge
                            isSmall
                            primaryText={'4.2'}
                            secondText={'/5'}
                            description={'Average project score2'}
                            color={'#EE2A64'}
                        />
                        <Badge
                            isSmall
                            primaryText={'4.2'}
                            secondText={'/5'}
                            description={'Average project score3'}
                            color={'#FFD231'}
                        />
                        <Badge
                            isSmall
                            primaryText={'4.2'}
                            secondText={'/5'}
                            description={'Average project score4'}
                            color={'#D32AEE'}
                        />
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
                                    label={hardSkill.name as string}
                                    className={styles.chip}
                                />
                            );
                        })}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export { Profile };
