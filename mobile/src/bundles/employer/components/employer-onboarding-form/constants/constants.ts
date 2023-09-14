import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

const EMPLOYER_ONBOARDING_DEFAULT_VALUES: EmployerOnboardingFormDto = {
    profilePhoto: null,
    companyLogo: null,
    fullName: '',
    position: '',
    linkedinLink: '',
    companyName: '',
    companyWebsite: '',
    location: '',
    description: '',
};

export { EMPLOYER_ONBOARDING_DEFAULT_VALUES };
