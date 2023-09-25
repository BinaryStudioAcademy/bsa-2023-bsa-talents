import { mockBadges } from '~/assets/mock-data/mock-data.js';
import { CandidateModal } from '~/bundles/candidate-components/components/components.js';
import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '~/bundles/talent-onboarding/components/components.js';
import { type RootReducer } from '~/framework/store/store.js';

import { trimZerosFromNumber } from '../../../talent-onboarding/helpers/helpers.js';
import {
    type FirstSectionDetails,
    type SecondSectionDetails,
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
    const reduxData = useAppSelector((state: RootReducer) => ({
        ...state.talentOnBoarding,
        email: state.auth.currentUser?.email,
    }));

    const data = candidateData ?? reduxData;

    const firstSectionCandidateDetails: FirstSectionDetails = {
        userId: data.userId as string,
        profileName: data.profileName as string,
        salaryExpectation: data.salaryExpectation as unknown as string,
        projectLinks: data.projectLinks as string[],
        location: data.location as string,
        englishLevel: data.englishLevel as string,
        //badges: mockBadges.filter((badge) => data.badges?.includes(badge.id)),
        badges: mockBadges,
        preferredLanguages: data.preferredLanguages as string[],
        description: data.description as string,
        hardSkills: data.hardSkills?.map((skill) => skill.label),
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
