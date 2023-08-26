import { type FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import {
    type File as MulterFile,
    type FileFilterCallback,
} from 'fastify-multer/lib/interfaces.js';

import {
    AllowedExtensions,
    AllowedMimeTypes,
    FileSize,
} from './enums/enums.js';

const storage = multer.memoryStorage();

const fileFilter = (
    request: FastifyRequest,
    file: MulterFile,
    callback: FileFilterCallback,
): void => {
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
};

const uploadFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: FileSize.MAX,
    },
});

export { uploadFile };
