import { type EmployerRegistrationDto } from '~/bundles/employer/types/types.js';

const REQUIRED = 'string.empty';
const ACCEPTED_PHOTO_TYPES = ['.jpeg', '.png', '.jpg'];
const MAX_FILE_SIZE = {
    'mb': 5,
    'bytes': 5_242_880,
};

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
    MAX_FILE_SIZE,
    REQUIRED,
};
