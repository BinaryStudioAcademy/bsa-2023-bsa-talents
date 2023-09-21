import { type EmployerOnboardingDto } from '~/bundles/employer-onboarding/types/types.js';

const ACCEPTED_PHOTO_TYPES = ['.jpeg', '.png', '.jpg'];

const DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD: EmployerOnboardingDto = {
    photo: null,
    fullName: '',
    employerPosition: '',
    companyName: '',
    companyWebsite: '',
    location: '',
    description: '',
    companyLogo: null,
    linkedinLink: '',
    isApproved: false,
};

export { ACCEPTED_PHOTO_TYPES, DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD };
