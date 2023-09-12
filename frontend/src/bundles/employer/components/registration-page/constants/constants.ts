import { type EmployerRegistrationDto } from 'shared/build/index.js';

const REQUIRED = 'string.empty';
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

export {
    ACCEPTED_PHOTO_TYPES,
    DEFAULT_EMPLOYER_REGISTRATION_FORM_PAYLOAD,
    REQUIRED,
};
