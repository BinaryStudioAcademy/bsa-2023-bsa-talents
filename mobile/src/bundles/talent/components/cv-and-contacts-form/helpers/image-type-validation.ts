import { ACCEPTED_PHOTO_TYPES } from '../constants/constants';

const lastIndex = 1;

const imageTypeValidation = (type: string): string => {
    const typeImage = type.split('/')[lastIndex];

    if (!ACCEPTED_PHOTO_TYPES.includes(typeImage)) {
        return `Allowed image file could be only ${ACCEPTED_PHOTO_TYPES.join(
            ', ',
        )}`;
    }
    return '';
};

export { imageTypeValidation };
