// FIX: create separate folder for each helper

import {
    type FieldPath,
    type FieldValues,
    type UseFormClearErrors,
    type UseFormSetError,
} from 'react-hook-form';

import { MAX_FILE_SIZE } from '../../components/contacts-cv-step/constants/constants.js';

const validateFileSize = <T extends FieldValues>({
    name,
    file,
    setError,
    clearErrors,
}: {
    name: FieldPath<T>;
    file: File;
    setError: UseFormSetError<T>;
    clearErrors: UseFormClearErrors<T>;
}): void => {
    if (file.size > MAX_FILE_SIZE.bytes) {
        const errorMessage = `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`;
        setError(name, {
            message: errorMessage,
            type: 'fileSize',
        });
        throw new Error(errorMessage);
    } else {
        clearErrors(name);
    }
};

export { validateFileSize };
