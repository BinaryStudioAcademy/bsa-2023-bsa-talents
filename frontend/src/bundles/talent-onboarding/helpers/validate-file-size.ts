import {
    type FieldPath,
    type FieldValues,
    type UseFormSetError,
} from 'react-hook-form';

import { MAX_FILE_SIZE } from '../components/fourth-step/constants/constants.js';

const validateFileSize = <T extends FieldValues>(
    name: FieldPath<T>,
    file: File,
    setError: UseFormSetError<T>,
): void => {
    if (file.size > MAX_FILE_SIZE.bytes) {
        setError(name, {
            message: `Please upload a ${name} smaller than ${MAX_FILE_SIZE.mb} MB.`,
            type: 'fileSize',
        });
        throw new Error('asdf');
    }
};

export { validateFileSize };
