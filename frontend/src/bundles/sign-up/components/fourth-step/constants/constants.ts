import { type UserSignUpStep4Dto } from '~/bundles/sign-up/types/types.js';

const REQUIRED = 'string.empty';
const ACCEPTED_PHOTO_TYPES = ['.jpeg', '.png', '.jpg'];
const ACCEPTED_CV_TYPES = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE = {
    'mb': 5,
    'bytes': 5_242_880,
};

const DEFAULT_SIGN_UP_PAYLOAD_STEP4: UserSignUpStep4Dto = {
    photo: null,
    fullName: '',
    phoneNumber: '',
    linkedInLink: '',
    cv: null,
};

export {
    ACCEPTED_CV_TYPES,
    ACCEPTED_PHOTO_TYPES,
    DEFAULT_SIGN_UP_PAYLOAD_STEP4,
    MAX_FILE_SIZE,
    REQUIRED,
};
