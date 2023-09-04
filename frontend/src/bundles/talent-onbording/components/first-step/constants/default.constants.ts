import { type UserSignUpStep1Dto } from '~/bundles/talent-onbording/types/types.js';

const DEFAULT_SIGN_UP_PAYLOAD_STEP1: UserSignUpStep1Dto = {
    profileName: '',
    salaryExpectation: 0,
    jobTitle: ' ',
    location: ' ',
    experienceYears: 0,
    employmentTypes: [],
    description: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD_STEP1 };
