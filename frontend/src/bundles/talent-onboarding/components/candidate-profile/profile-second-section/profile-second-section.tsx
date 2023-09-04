import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { CandidateIcons } from '~/bundles/talent-onboarding/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
    // replace with real data type
    candidateParameters: Record<string, string | number | string[]>;
    isProfileOpen: boolean;
};

const ProfileSecondSection: React.FC<Properties> = ({
    candidateParameters,
    isProfileOpen,
}) => {
    return (
        //  replace with real data
        <Grid className={styles.profileSecondSection}>
            <Grid className={styles.candidateInfo}>
                {isProfileOpen ? (
                    <Typography variant="h4" className={styles.name}>
                        {candidateParameters.photo ? (
                            <img
                                src={candidateParameters.photo as string}
                                alt="candidate"
                            />
                        ) : (
                            <Grid className={styles.emptyPhoto}></Grid>
                        )}
                        {candidateParameters.fullName}
                    </Typography>
                ) : (
                    <Typography
                        variant="h4"
                        className={getValidClassNames(
                            styles.salary,
                            styles.salaryTitle,
                        )}
                    >
                        $ {candidateParameters.salaryExpectation}
                    </Typography>
                )}
                <ul className={styles.candidateParamsList}>
                    {isProfileOpen && (
                        <li className={styles.candidateParam}>
                            <img
                                src={CandidateIcons.SALARY}
                                className={styles.icon}
                                alt="salary"
                            />
                            <Typography variant="h4" className={styles.salary}>
                                $ {candidateParameters.salaryExpectation}
                            </Typography>
                        </li>
                    )}
                    {isProfileOpen && (
                        <>
                            <li className={styles.candidateParam}>
                                <img
                                    src={CandidateIcons.EMAIL}
                                    className={styles.icon}
                                    alt="email"
                                />
                                <Typography variant="body1">
                                    {candidateParameters.email}
                                </Typography>
                            </li>
                            <li className={styles.candidateParam}>
                                <img
                                    src={CandidateIcons.TELEGRAM}
                                    className={styles.icon}
                                    alt="telegram"
                                />
                                <Typography variant="body1">
                                    {candidateParameters.telegram}
                                </Typography>
                            </li>
                            <li className={styles.candidateParam}>
                                <img
                                    src={CandidateIcons.PHONE}
                                    className={styles.icon}
                                    alt="phone"
                                />
                                <Typography variant="body1">
                                    {candidateParameters.phone}
                                </Typography>
                            </li>
                        </>
                    )}
                    <li className={styles.candidateParam}>
                        <img
                            src={CandidateIcons.LOCATION}
                            className={styles.icon}
                            alt="location"
                        />
                        <Typography variant="body1">
                            {candidateParameters.location}
                        </Typography>
                    </li>
                    <li className={styles.candidateParam}>
                        <img
                            src={CandidateIcons.EXPERIENCE}
                            className={styles.icon}
                            alt="experience"
                        />
                        <Typography variant="body1">
                            {candidateParameters.experienceYears}
                        </Typography>
                    </li>
                    <li className={styles.candidateParam}>
                        <img
                            src={CandidateIcons.ENGLISH}
                            className={styles.icon}
                            alt="english"
                        />
                        <Typography variant="body1">
                            {candidateParameters.englishLevel}
                        </Typography>
                    </li>
                    {(candidateParameters.employmentType as string[]).map(
                        (employment: string) => (
                            <li
                                key={employment}
                                className={styles.candidateParam}
                            >
                                <img
                                    src={CandidateIcons.EMPLOYMENT}
                                    className={styles.icon}
                                    alt="employment type"
                                />
                                <Typography variant="body1">
                                    {employment}
                                </Typography>
                            </li>
                        ),
                    )}
                    <li className={styles.candidateParam}>
                        <img
                            src={CandidateIcons.EMPLOYMENT}
                            className={styles.icon}
                            alt="work schedule"
                        />
                        <Typography variant="body1">
                            {candidateParameters.workSchedule}
                        </Typography>
                    </li>
                    {(candidateParameters.notConsidered as string[]).map(
                        (notConsidered) => (
                            <li
                                key={notConsidered}
                                className={styles.candidateParam}
                            >
                                <img
                                    src={CandidateIcons.NOT_CONSIDERED}
                                    className={styles.icon}
                                    alt="not considered"
                                />
                                <Typography variant="body1">
                                    {notConsidered}
                                </Typography>
                            </li>
                        ),
                    )}
                </ul>
            </Grid>
            <Typography variant="caption" className={styles.publishDate}>
                Published today
            </Typography>
        </Grid>
    );
};

export { ProfileSecondSection };
