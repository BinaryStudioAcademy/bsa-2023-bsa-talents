import {
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';

import { MAX_FILE_SIZE } from '../constants/constants';

const fileSizeValidation = <T extends FieldValues>(
    name: FieldPath<T>,
    fileSize: number,
    setError: UseFormSetError<T>,
): void => {
    if (fileSize > MAX_FILE_SIZE.bytes) {
        const errorMessage = `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`;
        setError(name, {
            message: errorMessage,
        });
    }
};

export { fileSizeValidation };
