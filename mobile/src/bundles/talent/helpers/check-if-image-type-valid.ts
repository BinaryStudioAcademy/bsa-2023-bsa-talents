import { ACCEPTED_PHOTO_TYPES } from './constants/constants';

const lastIndex = 1;

const checkIfImageTypeValid = (type: string | undefined): boolean => {
    const typeImage = type?.split('/')[lastIndex];

    return Boolean(typeImage && ACCEPTED_PHOTO_TYPES.includes(typeImage));
};

export { checkIfImageTypeValid };
