import { CountryList } from '~/bundles/common/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';

const LOCATION_OPTIONS = Object.values(CountryList);

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

export { EMPLOYER_ONBOARDING_DEFAULT_VALUES, LOCATION_OPTIONS };
