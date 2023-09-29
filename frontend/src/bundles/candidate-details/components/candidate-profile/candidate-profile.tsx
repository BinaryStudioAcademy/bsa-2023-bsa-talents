import { type TalentBadge } from 'shared/build/index.js';
import { UserRole } from 'shared/build/index.js';

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
import { type SeacrhCandidateResponse } from '~/bundles/search-candidates/types/types.js';
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
} from '../../../talent-onboarding/types/types.js';
import styles from './styles.module.scss';

type Properties = {
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
    candidateData?: SeacrhCandidateResponse & {
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

    const reduxData = useAppSelector((state: RootReducer) => ({
        ...state.talentOnBoarding,
        email: state.auth.currentUser?.email,
    }));
    const { publishedAt } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );

    const data = candidateData ?? reduxData;
    const hardskillsLabels = hardSkillsOptions
        .filter(
            (item) =>
                reduxData.talentHardSkills?.some(
                    (skill) =>
                        (skill as unknown as TalentHardSkill).hardSkillId ===
                        item.value,
                ),
        )
        .map((item) => item.label);
    const hardSkillsToShow =
        !isFifthStep && candidateData?.hardSkills
            ? candidateData.hardSkills.map((item) => item.name)
            : hardskillsLabels;

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(
            talentActions.getTalentDetails({
                userId: currentUser?.id,
            }),
        );
        if (currentUser?.role == UserRole.EMPLOYER) {
            void dispatch(
                hiringInfoActions.getHiringInfo({
                    talentId: data.userId ?? '',
                    companyId: currentUser.id,
                }),
            );
            void dispatch(
                candidateActions.getContactWithTalent({
                    talentId: data.userId ?? '',
                    companyId: currentUser.id,
                }),
            );
        }
    }, [currentUser, data.userId, dispatch]);
    const firstSectionCandidateDetails: FirstSectionDetails = {
        userId: data.userId as string,
        profileName: data.profileName as string,
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        badges: data.badges as TalentBadge[],
        preferredLanguages: data.preferredLanguages as string[],
        description: data.description as string,
        talentHardSkills: hardSkillsToShow,
        experienceYears: data.experienceYears as number,
        date: data.createdAt as string,
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
