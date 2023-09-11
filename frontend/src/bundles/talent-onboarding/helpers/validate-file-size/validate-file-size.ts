// FIX: create separate folder for each helper

import {
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';

import { MAX_FILE_SIZE } from '../../components/contacts-cv-step/constants/constants.js';

const validateFileSize = <T extends FieldValues>(
    name: FieldPath<T>,
    file: File,
    setError: UseFormSetError<T>,
): void => {
    if (file.size > MAX_FILE_SIZE.bytes) {
        const errorMessage = `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`;
        setError(name, {
            message: errorMessage,
            type: 'fileSize',
        });
        throw new Error(errorMessage);
    }
};

export { validateFileSize };
