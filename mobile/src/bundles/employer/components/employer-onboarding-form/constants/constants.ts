import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

const EMPLOYER_ONBOARDING_DEFAULT_VALUES: EmployerOnboardingFormDto = {
    photo: null,
    companyLogo: null,
    fullName: '',
    employerPosition: '',
    linkedinLink: '',
    companyName: '',
    companyWebsite: '',
    location: '',
    description: '',
};

export { EMPLOYER_ONBOARDING_DEFAULT_VALUES };
