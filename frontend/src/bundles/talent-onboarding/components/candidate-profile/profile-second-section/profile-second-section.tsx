import {
    Button,
    FormControl,
    Grid,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';
import { CandidateParameter } from '~/bundles/talent-onboarding/components/components.js';
import { CandidateIcons } from '~/bundles/talent-onboarding/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
    //TODO: replace with real data type
    candidateParameters: Record<string, string | number | string[]>;
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
};

const ProfileSecondSection: React.FC<Properties> = ({
    candidateParameters,
    isProfileOpen,
    isFifthStep,
}) => {
    const options = [
        {
            value: 'Yes',
            label: 'Yes',
        },
        {
            value: 'No',
            label: 'No',
        },
    ];
    // TODO: fill with real data
    const { control } = useAppForm<{ hire: '' }>({
        defaultValues: { hire: '' },
    });

    return (
        // TODO: replace with real data
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
                        {candidateParameters.salaryExpectation}
                    </Typography>
                )}
                <ul className={styles.candidateParamsList}>
                    {isProfileOpen && (
                        <CandidateParameter
                            typographyVariant="h4"
                            className={styles.salary}
                            text={candidateParameters.salaryExpectation}
                        >
                            {<CandidateIcons.SALARY className={styles.icon} />}
                        </CandidateParameter>
                    )}
                    {isProfileOpen && (
                        <>
                            <CandidateParameter
                                text={candidateParameters.email}
                            >
                                <CandidateIcons.EMAIL className={styles.icon} />
                            </CandidateParameter>

                            <CandidateParameter
                                text={candidateParameters.telegram}
                            >
                                <CandidateIcons.TELEGRAM
                                    className={styles.icon}
                                />
                            </CandidateParameter>

                            <CandidateParameter
                                text={candidateParameters.phone}
                            >
                                <CandidateIcons.PHONE className={styles.icon} />
                            </CandidateParameter>
                        </>
                    )}
                    <CandidateParameter text={candidateParameters.location}>
                        <CandidateIcons.LOCATION className={styles.icon} />
                    </CandidateParameter>

                    <CandidateParameter
                        text={candidateParameters.experienceYears}
                    >
                        <CandidateIcons.EXPERIENCE className={styles.icon} />
                    </CandidateParameter>

                    <CandidateParameter text={candidateParameters.englishLevel}>
                        <CandidateIcons.ENGLISH className={styles.icon} />
                    </CandidateParameter>

                    {(candidateParameters.employmentType as string[]).map(
                        (employment: string) => (
                            <CandidateParameter
                                key={employment}
                                text={employment}
                            >
                                <CandidateIcons.EMPLOYMENT
                                    className={styles.icon}
                                />
                            </CandidateParameter>
                        ),
                    )}

                    <CandidateParameter text={candidateParameters.workSchedule}>
                        <CandidateIcons.EMPLOYMENT className={styles.icon} />
                    </CandidateParameter>

                    {(candidateParameters.notConsidered as string[]).map(
                        (notConsidered) => (
                            <CandidateParameter
                                key={notConsidered}
                                text={notConsidered}
                            >
                                <CandidateIcons.NOT_CONSIDERED
                                    className={getValidClassNames(
                                        styles.icon,
                                        styles.redIcon,
                                    )}
                                />
                            </CandidateParameter>
                        ),
                    )}
                </ul>
            </Grid>
            {!isProfileOpen && (
                <>
                    <Typography
                        variant="caption"
                        className={styles.publishDate}
                    >
                        Published today
                    </Typography>
                    {!isFifthStep && (
                        <Button
                            label="Contact candidate"
                            className={styles.contactButton}
                        />
                    )}
                </>
            )}
            {isProfileOpen && (
                <FormControl className={styles.hireCandidates}>
                    <Typography variant="label">
                        Have you hired a candidates?
                    </Typography>
                    <RadioGroup
                        control={control}
                        options={options}
                        name={'hire'}
                        className={styles.radio}
                    />
                    <Button
                        label="Submit"
                        variant="outlined"
                        className={styles.submit}
                    />
                </FormControl>
            )}
        </Grid>
    );
};

export { ProfileSecondSection };
