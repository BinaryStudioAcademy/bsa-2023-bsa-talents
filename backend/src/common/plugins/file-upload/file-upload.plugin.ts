import { type FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import {
    type File as MulterFile,
    type FileFilterCallback,
} from 'fastify-multer/lib/interfaces.js';
import { FileUploadErrorMessage } from 'shared/build/index.js';

import {
    AllowedExtensions,
    AllowedMimeTypes,
    FileGroups,
    FileSize,
} from './enums/enums.js';

const storage = multer.memoryStorage();

const fileFilter = (
    request: FastifyRequest,
    file: MulterFile,
    callback: FileFilterCallback,
): void => {
    const fileExtension =
        file.originalname.split('.').pop()?.toLowerCase() ?? '';

    let isValidMimeType = false;
    let isValidExtension = false;

    switch (file.fieldname) {
        case FileGroups.DOCUMENT: {
            isValidMimeType = [
                AllowedMimeTypes.PDF,
                AllowedMimeTypes.DOC,
                AllowedMimeTypes.DOCX,
            ].includes(file.mimetype);
            isValidExtension = [
                AllowedExtensions.PDF,
                AllowedExtensions.DOCX,
                AllowedExtensions.DOC,
            ].includes(fileExtension);
            break;
        }
        case FileGroups.IMAGE: {
            isValidMimeType = [
                AllowedMimeTypes.JPEG,
                AllowedMimeTypes.PNG,
            ].includes(file.mimetype);
            isValidExtension = [
                AllowedExtensions.JPEG,
                AllowedExtensions.JPG,
                AllowedExtensions.PNG,
            ].includes(fileExtension);
            break;
        }
        default: {
            callback(
                new Error(FileUploadErrorMessage.INVALID_FILE_GROUP),
                false,
            );
            return;
        }
    }

    if (isValidMimeType && isValidExtension) {
        callback(null, true);
    } else {
        callback(new Error(FileUploadErrorMessage.INVALID_FILE), false);
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
