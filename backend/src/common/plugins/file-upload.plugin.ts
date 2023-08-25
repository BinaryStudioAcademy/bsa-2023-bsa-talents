import { type FastifyRequest } from 'fastify';
import multer from 'fastify-multer';

import { AllowedExtensions, AllowedMimeTypes } from './enums/enums.js';
import { type uploadedFile } from './types/uploaded-file.type.js';

const storage = multer.memoryStorage();

function isUploadedFile(file: unknown): file is uploadedFile {
    return (
        typeof file === 'object' &&
        file !== null &&
        'fieldname' in file &&
        'originalname' in file &&
        'encoding' in file &&
        'mimetype' in file
    );
}

const fileFilter = (
    request: FastifyRequest,
    file: unknown | uploadedFile,
    callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
    if (isUploadedFile(file)) {
        if (
            file.mimetype === AllowedMimeTypes.PDF ||
            file.mimetype === AllowedMimeTypes.DOC ||
            file.mimetype === AllowedMimeTypes.DOCX
        ) {
            const fileExtension =
                file.originalname.split('.').pop()?.toLowerCase() ?? '';
            if (
                fileExtension === AllowedExtensions.PDF ||
                fileExtension === AllowedExtensions.DOCX ||
                fileExtension === AllowedExtensions.DOC
            ) {
                callback(null, true);
            } else {
                callback(new Error('Invalid file extension'), false);
            }
        } else {
            callback(new Error('Invalid file mimetype'), false);
        }
    }
};

const uploadFile = multer({
    storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10_000_000,
    },
});

export { uploadFile };
