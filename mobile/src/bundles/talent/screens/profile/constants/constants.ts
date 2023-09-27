import { type ProfileStepDto } from 'shared/build/bundles/talent-onboarding/types/profile-step/profile-step-dto';

const TALENT_PROFILE_DEFAULT_VALUES: ProfileStepDto = {
    profileName: '',
    salaryExpectation: 0,
    jobTitle: '',
    location: '',
    experienceYears: 0,
    employmentType: [],
    description: '',
};

export { TALENT_PROFILE_DEFAULT_VALUES };
