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
    // replace with real data type
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
    // fill with real data
    const { control } = useAppForm<{ hire: '' }>({
        defaultValues: { hire: '' },
    });

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
                        {candidateParameters.salaryExpectation}
                    </Typography>
                )}
                <ul className={styles.candidateParamsList}>
                    {isProfileOpen && (
                        <CandidateParameter
                            icon={CandidateIcons.SALARY}
                            imgAlt="salary"
                            typographyVariant="h4"
                            className={styles.salary}
                            text={candidateParameters.salaryExpectation}
                        />
                    )}
                    {isProfileOpen && (
                        <>
                            <CandidateParameter
                                icon={CandidateIcons.EMAIL}
                                imgAlt="email"
                                text={candidateParameters.email}
                            />
                            <CandidateParameter
                                icon={CandidateIcons.TELEGRAM}
                                imgAlt="telegram"
                                text={candidateParameters.telegram}
                            />
                            <CandidateParameter
                                icon={CandidateIcons.PHONE}
                                imgAlt="phone"
                                text={candidateParameters.phone}
                            />
                        </>
                    )}
                    <CandidateParameter
                        icon={CandidateIcons.LOCATION}
                        imgAlt="location"
                        text={candidateParameters.location}
                    />
                    <CandidateParameter
                        icon={CandidateIcons.EXPERIENCE}
                        imgAlt="experience"
                        text={candidateParameters.experienceYears}
                    />
                    <CandidateParameter
                        icon={CandidateIcons.ENGLISH}
                        imgAlt="english"
                        text={candidateParameters.englishLevel}
                    />
                    {(candidateParameters.employmentType as string[]).map(
                        (employment: string) => (
                            <CandidateParameter
                                key={employment}
                                icon={CandidateIcons.EMPLOYMENT}
                                imgAlt="employment type"
                                text={employment}
                            />
                        ),
                    )}
                    <CandidateParameter
                        icon={CandidateIcons.EMPLOYMENT}
                        imgAlt="work schedule"
                        text={candidateParameters.workSchedule}
                    />
                    {(candidateParameters.notConsidered as string[]).map(
                        (notConsidered) => (
                            <CandidateParameter
                                key={notConsidered}
                                icon={CandidateIcons.NOT_CONSIDERED}
                                imgAlt="not considered"
                                text={notConsidered}
                            />
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
