import { Country } from '~/bundles/common/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

const LOCATION_OPTIONS = Object.values(Country);

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

export { EMPLOYER_ONBOARDING_DEFAULT_VALUES, LOCATION_OPTIONS };
