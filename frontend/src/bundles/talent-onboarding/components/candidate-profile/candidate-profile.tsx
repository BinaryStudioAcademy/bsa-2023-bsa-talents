import { Button, Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '~/bundles/talent-onboarding/components/components.js';

import styles from './styles.module.scss';

const mockedCandidateParameters = {
    salaryExpectation: 1500,
    location: 'Ukraine',
    experienceYears: '1 year of experience',
    englishLevel: 'English: Upper-Intermediate',
    employmentType: ['Remote work'],
    workSchedule: 'Full time',
    notConsidered: ['Doesn`t consider: crypto'],
    fullName: 'Vadym',
    telegram: '@name',
    phone: '063 888 88 88',
    email: 'name@gmail.com',
};

type Properties = {
    isProfileOpen?: boolean;
    isFifthStep?: boolean;
    isProfileCard?: boolean;
};

const CandidateProfile: React.FC<Properties> = ({
    isProfileOpen,
    isFifthStep,
    isProfileCard,
}) => {
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
                    isProfileCard ? styles.profileCardWrapper : '',
                )}
            >
                <ProfileFirstSection
                    isProfileOpen={isProfileOpen}
                    isFifthStep={isFifthStep}
                    isProfileCard={isProfileCard}
                />
                {!isProfileCard && (
                    <ProfileSecondSection
                        isProfileOpen={isProfileOpen}
                        isFifthStep={isFifthStep}
                        candidateParameters={mockedCandidateParameters}
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
