import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';

const CV_AND_CONTACTS_DEFAULT_VALUES: CvAndContactsFormDto = {
    photo: null,
    fullName: '',
    phoneNumber: '',
    linkedInLink: '',
    cv: null,
};

const REQUIRED = 'string.empty';
const ACCEPTED_PHOTO_TYPES = ['jpeg', 'png', 'jpg'];
const MAX_FILE_SIZE = {
    'mb': 5,
    'bytes': 5_242_880,
};

export {
    ACCEPTED_PHOTO_TYPES,
    CV_AND_CONTACTS_DEFAULT_VALUES,
    MAX_FILE_SIZE,
    REQUIRED,
};
