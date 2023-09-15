import { type ProfileStepDto } from '~/bundles/talent-onboarding/types/types.js';

type ModifiedProfileStepDto = Omit<ProfileStepDto, 'salaryExpectation'> & {
    salaryExpectation?: number;
};

const DEFAULT_PAYLOAD_PROFILE_STEP: ModifiedProfileStepDto = {
    profileName: '',
    salaryExpectation: undefined,
    jobTitle: '',
    location: '',
    experienceYears: 0,
    employmentType: [],
    description: '',
};

export { DEFAULT_PAYLOAD_PROFILE_STEP };
