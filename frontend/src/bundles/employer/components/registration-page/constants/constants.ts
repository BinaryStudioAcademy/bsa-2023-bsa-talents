import { type EmployerRegistrationDto } from '~/bundles/employer/types/types.js';

const ACCEPTED_PHOTO_TYPES = ['.jpeg', '.png', '.jpg'];

const DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD: EmployerRegistrationDto = {
    photo: null,
    fullName: '',
    position: '',
    companyName: '',
    companyWebsite: '',
    location: '',
    description: '',
    companyLogo: null,
    linkedInLink: '',
};

export { ACCEPTED_PHOTO_TYPES, DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD };
