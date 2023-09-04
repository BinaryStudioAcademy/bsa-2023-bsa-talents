import { Button, Grid } from '~/bundles/common/components/components.js';

import {
    ProfileFirstSection,
    ProfileSecondSection,
} from '../../../talent-onboarding/components/components.js';
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
    isProfileOpen: boolean;
    isFifthStep?: boolean;
};

const CandidateProfile: React.FC<Properties> = ({
    isProfileOpen,
    isFifthStep,
}) => {
    return (
        <>
            {isFifthStep && (
                <Button
                    label="Your account is ready!"
                    variant="text"
                    className={styles.accountReadyButton}
                />
            )}
            <Grid className={styles.profileWrapper}>
                <ProfileFirstSection />
                <ProfileSecondSection
                    isProfileOpen={isProfileOpen}
                    isFifthStep={isFifthStep}
                    candidateParameters={mockedCandidateParameters}
                />
            </Grid>
            {!isProfileOpen && !isFifthStep && (
                <Button
                    label="Contact candidate"
                    className={styles.contactButton}
                />
            )}
        </>
    );
};

export { CandidateProfile };
