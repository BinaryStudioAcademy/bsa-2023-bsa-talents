import {
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';

import { ACCEPTED_PHOTO_TYPES } from '../constants/constants';

const lastIndex = 1;

const imageTypeValidation = <T extends FieldValues>(
    name: FieldPath<T>,
    setError: UseFormSetError<T>,
    type: string,
): void => {
    const typeImage = type.split('/')[lastIndex];

    if (!ACCEPTED_PHOTO_TYPES.includes(typeImage)) {
        const errorMessage = `Allowed image file could be only ${ACCEPTED_PHOTO_TYPES.join(
            ', ',
        )}`;
        setError(name, {
            message: errorMessage,
        });
    }
};

export { imageTypeValidation };
