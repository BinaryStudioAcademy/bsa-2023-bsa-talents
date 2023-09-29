import {
    Avatar,
    Button,
    FormControl,
    Grid,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { actions as hiringInfoActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { CandidateParameter } from '~/bundles/talent-onboarding/components/components.js';
import { PLURAL_YEARS } from '~/bundles/talent-onboarding/constants/constants.js';
import { CandidateIcons } from '~/bundles/talent-onboarding/enums/enums.js';
import { type SecondSectionDetails } from '~/bundles/talent-onboarding/types/types.js';

import { CandidateModal } from '../../components.js';
import styles from './styles.module.scss';

type Properties = {
    candidateParameters: SecondSectionDetails;
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isContactModalOpen: boolean;
    onContactModalClose: () => void;
    onContactModalOpen: () => void;
};

const ProfileSecondSection: React.FC<Properties> = ({
    candidateParameters,
    isProfileOpen,
    isFifthStep,
    isContactModalOpen,
    onContactModalClose,
    onContactModalOpen,
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

    const { control, watch } = useAppForm<{ hire: 'Yes' | 'No' }>({
        defaultValues: { hire: 'Yes' },
    });

    const dispatch = useAppDispatch();
    const { companyId, talentId, isHired } = useAppSelector(
        ({ auth, searchCandidates }) => ({
            companyId: auth.currentUser?.id,
            talentId: searchCandidates.currentCandidateDetails?.userId,
            isHired: searchCandidates.currentCandidateDetails?.isHired,
        }),
    );

    const handleHireSubmit = useCallback((): void => {
        if (watch('hire') === 'Yes') {
            void dispatch(
                hiringInfoActions.submitHiringInfo({
                    talentId: talentId ?? '',
                    companyId: companyId ?? '',
                }),
            );
        }
    }, [companyId, dispatch, talentId, watch]);

    return (
        <Grid className={styles.profileSecondSection}>
            <Grid className={styles.candidateInfo}>
                {isProfileOpen ? (
                    <Typography variant="h4" className={styles.name}>
                        {candidateParameters.photoId ? (
                            <img
                                src={candidateParameters.photoId}
                                alt="candidate"
                            />
                        ) : (
                            <Avatar className={styles.emptyPhoto} />
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
                                text={candidateParameters.email ?? 'email'}
                            >
                                <CandidateIcons.EMAIL className={styles.icon} />
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
                        text={
                            candidateParameters.experienceYears >= PLURAL_YEARS
                                ? `${candidateParameters.experienceYears} years of experience`
                                : `${candidateParameters.experienceYears} year of experience`
                        }
                    >
                        <CandidateIcons.EXPERIENCE className={styles.icon} />
                    </CandidateParameter>

                    <CandidateParameter text={candidateParameters.englishLevel}>
                        <CandidateIcons.ENGLISH className={styles.icon} />
                    </CandidateParameter>

                    {candidateParameters.employmentType.map(
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

                    {candidateParameters.notConsidered.map((notConsidered) => (
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
                    ))}
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
                        <Grid className={styles.modalWrapper}>
                            <CandidateModal
                                isOpen={isContactModalOpen}
                                onClose={onContactModalClose}
                            />
                            <Button
                                label="Contact candidate"
                                className={styles.contactButton}
                                onClick={onContactModalOpen}
                            />
                        </Grid>
                    )}
                </>
            )}
            {isProfileOpen && (
                <FormControl className={styles.hireCandidates}>
                    {!isHired && (
                        <>
                            <Typography variant="label">
                                Have you hired a candidate?
                            </Typography>
                            <RadioGroup
                                control={control}
                                options={options}
                                name={'hire'}
                                className={styles.radio}
                            />
                        </>
                    )}
                    {isHired && (
                        <Typography variant="label">
                            You have hired this candidate
                        </Typography>
                    )}
                    <Button
                        label="Submit"
                        variant="outlined"
                        className={styles.submit}
                        onClick={handleHireSubmit}
                        isDisabled={isHired}
                    />
                </FormControl>
            )}
        </Grid>
    );
};

export { ProfileSecondSection };
