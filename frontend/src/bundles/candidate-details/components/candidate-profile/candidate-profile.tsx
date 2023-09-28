import { UserRole } from 'shared/build/index.js';

import { mockBadges } from '~/assets/mock-data/mock-data.js';
import { type State } from '~/bundles/auth/store/auth.js';
import { CandidateModal } from '~/bundles/candidate-details/components/components.js';
import { actions as candidateActions } from '~/bundles/candidate-details/store/candidate.js';
import { Button, Grid } from '~/bundles/common/components/components.js';
import { useCommonData } from '~/bundles/common/data/hooks/use-common-data.hook.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as hiringInfoActions } from '~/bundles/hiring-info/store/hiring-info.js';
import { actions as lmsActions } from '~/bundles/lms/store/lms.js';
import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '~/bundles/talent-onboarding/components/components.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.js';

import {
    type FirstSectionDetails,
    type SecondSectionDetails,
    type TalentHardSkill,
    type UserDetailsGeneralCustom,
} from '../../../talent-onboarding/types/types.js';
import styles from './styles.module.scss';

type Properties = {
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
    candidateData?: UserDetailsGeneralCustom & {
        email?: string;
    };
};

const getAuthState = (state: RootReducer): State => state.auth;

const CandidateProfile: React.FC<Properties> = ({
    isProfileOpen,
    isFifthStep,
    isProfileCard,
    candidateData,
}) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const handleCloseContactModal = useCallback(() => {
        setIsContactModalOpen(false);
    }, []);
    const handleOpenContactModal = useCallback(() => {
        setIsContactModalOpen(true);
    }, []);
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );
    const { hardSkillsOptions } = useCommonData();

    const dispatch = useAppDispatch();

    const reduxData = useAppSelector((state: RootReducer) => ({
        ...state.talentOnBoarding,
        email: state.auth.currentUser?.email,
        lmsProject: state.lms.lmsData?.project,
    }));
    const { publishedAt } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const data = candidateData ?? reduxData;

    useEffect(() => {
        const userId = currentUser?.id as string;

        void dispatch(talentActions.getTalentDetails({ userId }));
        void dispatch(lmsActions.getTalentLmsData({ userId }));

        if (currentUser?.role == UserRole.EMPLOYER) {
            void dispatch(
                hiringInfoActions.getHiringInfo({
                    talentId: data.userId ?? '',
                    companyId: userId,
                }),
            );
            void dispatch(
                candidateActions.getContactWithTalent({
                    talentId: data.userId ?? '',
                    companyId: userId,
                }),
            );
        }
    }, [currentUser, data.userId, dispatch]);

    const hardskillsLabels = hardSkillsOptions
        .filter(
            (item) =>
                data.talentHardSkills?.some(
                    (skill) =>
                        (skill as unknown as TalentHardSkill).hardSkillId ===
                        item.value,
                ),
        )
        .map((item) => item.label);

    const firstSectionCandidateDetails: FirstSectionDetails = {
        userId: data.userId as string,
        profileName: data.profileName as string,
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        badges: mockBadges,
        preferredLanguages: data.preferredLanguages as string[],
        description: data.description as string,
        talentHardSkills: hardskillsLabels,
        experienceYears: data.experienceYears as number,
        date: data.createdAt as string,
        lmsProject: reduxData.lmsProject,
    };
    const secondSectionCandidateDetails: SecondSectionDetails = {
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        experienceYears: data.experienceYears as number,
        jobTitle: data.jobTitle,
        fullName: data.fullName as string,
        email: data.email as string,
        phone: data.phone as string,
        employmentType: data.employmentType as string[],
        notConsidered: data.notConsidered as string[],
        cvId: data.cvId as string,
    };
    const isContactButtonVisible =
        !isProfileOpen && !isFifthStep && !isProfileCard;

    return (
        <Grid className={styles.wrapper}>
            {isFifthStep && (
                <Button
                    label={
                        publishedAt
                            ? 'Your account is waiting for the approval'
                            : 'Your account is ready!'
                    }
                    variant="text"
                    className={styles.accountReadyButton}
                />
            )}
            <Grid
                className={getValidClassNames(
                    styles.profileWrapper,
                    isProfileCard && styles.profileCardWrapper,
                )}
            >
                <ProfileFirstSection
                    isProfileOpen={isProfileOpen}
                    isFifthStep={isFifthStep}
                    isProfileCard={isProfileCard}
                    candidateParameters={firstSectionCandidateDetails}
                />
                {!isProfileCard && (
                    <ProfileSecondSection
                        isProfileOpen={isProfileOpen}
                        isFifthStep={isFifthStep}
                        candidateParameters={secondSectionCandidateDetails}
                        isContactModalOpen={isContactModalOpen}
                        onContactModalClose={handleCloseContactModal}
                        onContactModalOpen={handleOpenContactModal}
                    />
                )}
            </Grid>
            {isContactButtonVisible && (
                <Grid className={styles.modalWrapper}>
                    <CandidateModal
                        isOpen={isContactModalOpen}
                        onClose={handleCloseContactModal}
                    />
                    <Button
                        label="Contact candidate"
                        className={styles.contactButton}
                        onClick={handleOpenContactModal}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export { CandidateProfile };
