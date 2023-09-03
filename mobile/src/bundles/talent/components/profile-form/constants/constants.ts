import { type TalentOnboardingProfileDto } from '~/bundles/talent/types/types';

const TALENT_PROFILE_DEFAULT_VALUES: TalentOnboardingProfileDto = {
    profileName: '',
    salaryExpectation: 0,
    jobTitle: '',
    location: '',
    experienceYears: 0,
    employmentTypes: [],
    description: '',
};

export { TALENT_PROFILE_DEFAULT_VALUES };
