import { ACCEPTED_PHOTO_TYPES } from '../components/cv-and-contacts-form/constants/constants';

const lastIndex = 1;

const imageTypeValidation = (type: string): void => {
    const typeImage = type.split('/')[lastIndex];

    if (!ACCEPTED_PHOTO_TYPES.includes(typeImage)) {
        const errorMessage = `Allowed image file could be only ${ACCEPTED_PHOTO_TYPES.join(
            ', ',
        )}`;
        throw new Error(errorMessage);
    }
};

export { imageTypeValidation };
