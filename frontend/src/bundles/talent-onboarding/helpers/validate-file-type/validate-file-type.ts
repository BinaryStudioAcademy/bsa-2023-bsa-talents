import {
    type FieldPath,
    type FieldValues,
    type UseFormClearErrors,
    type UseFormSetError,
} from 'react-hook-form';

import { ACCEPTED_CV_MIME_TYPES } from '../../components/contacts-cv-step/constants/constants.js';

const validateFileType = <T extends FieldValues>({
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
    if (ACCEPTED_CV_MIME_TYPES.includes(file.type)) {
        clearErrors(name);
    } else {
        const errorMessage = `Please upload a ${name} .pdf, .doc or .docx type.`;
        setError(name, {
            message: errorMessage,
            type: 'fileType',
        });
        throw new Error(errorMessage);
    }
};

export { validateFileType };
