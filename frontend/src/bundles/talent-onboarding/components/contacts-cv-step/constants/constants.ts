import { type ContactsCVStepDto } from '~/bundles/talent-onboarding/types/types.js';

const ACCEPTED_PHOTO_TYPES = ['.jpeg', '.png', '.jpg'];
const ACCEPTED_CV_TYPES = ['.pdf', '.doc', '.docx'];
const ACCEPTED_CV_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE = {
    'mb': 5,
    'bytes': 5_242_880,
};

const DEFAULT_CONTACTS_CV_STEP_PAYLOAD: ContactsCVStepDto = {
    photo: null,
    fullName: '',
    phone: '',
    linkedinLink: '',
    cv: null,
};

export {
    ACCEPTED_CV_MIME_TYPES,
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
    DEFAULT_CONTACTS_CV_STEP_PAYLOAD,
    MAX_FILE_SIZE,
};
