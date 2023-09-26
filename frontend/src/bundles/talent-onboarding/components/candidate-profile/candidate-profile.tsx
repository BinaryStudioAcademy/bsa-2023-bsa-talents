import { mockBadges } from '~/assets/mock-data/mock-data.js';
import { type State } from '~/bundles/auth/store/auth.js';
import { Button, Grid } from '~/bundles/common/components/components.js';
import { useCommonData } from '~/bundles/common/data/hooks/use-common-data.hook.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '~/bundles/talent-onboarding/components/components.js';
import { actions as talentActions } from '~/bundles/talent-onboarding/store/talent-onboarding.js';
import { type RootReducer } from '~/framework/store/store.js';

import { trimZerosFromNumber } from '../../helpers/helpers.js';
import {
    type FirstSectionDetails,
    type SecondSectionDetails,
    type TalentHardSkill,
    type UserDetailsGeneralCustom,
} from '../../types/types.js';
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
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );
    const { hardSkillsOptions } = useCommonData();
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(
            talentActions.getTalentDetails({
                userId: currentUser?.id,
            }),
        );
    }, [currentUser?.id, dispatch]);

    const reduxData = useAppSelector((state: RootReducer) => ({
        ...state.talentOnBoarding,
        email: state.auth.currentUser?.email,
    }));

    const data = candidateData ?? reduxData;

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
        profileName: data.profileName as string,
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        badges: mockBadges.filter((badge) => data.badges?.includes(badge.id)),
        preferredLanguages: data.preferredLanguages as string[],
        description: data.description as string,
        hardSkills: hardskillsLabels,
        experienceYears: trimZerosFromNumber(data.experienceYears as number),
        date: data.createdAt as string,
    };
    const secondSectionCandidateDetails: SecondSectionDetails = {
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        experienceYears: trimZerosFromNumber(data.experienceYears as number),
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
                    label="Your account is ready!"
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
                    />
                )}
            </Grid>
            {isContactButtonVisible && (
                <Button
                    label="Contact candidate"
                    className={styles.contactButton}
                />
            )}
        </Grid>
    );
};

export { CandidateProfile };
