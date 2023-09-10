import { type FieldPath, type FieldValues } from 'react-hook-form';

import { MAX_FILE_SIZE } from '../components/cv-and-contacts-form/constants/constants';

const fileSizeValidation = <T extends FieldValues>(
    name: FieldPath<T>,
    fileSize: number,
): void => {
    if (fileSize > MAX_FILE_SIZE.bytes) {
        const errorMessage = `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`;
        throw new Error(errorMessage);
    }
};

export { fileSizeValidation };
