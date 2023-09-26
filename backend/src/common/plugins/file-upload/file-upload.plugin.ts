import { type FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import {
    type File as MulterFile,
    type FileFilterCallback,
} from 'fastify-multer/lib/interfaces.js';
import { FileUploadErrorMessage, type ValueOf } from 'shared/build/index.js';

import {
    AllowedExtensions,
    AllowedMimeTypes,
    FileSize,
} from './enums/enums.js';

const storage = multer.memoryStorage();
const imageExtensionFilter = new Set<ValueOf<typeof AllowedExtensions>>([
    AllowedExtensions.JPG,
    AllowedExtensions.JPEG,
    AllowedExtensions.PNG,
]);
const documentExtensionFilter = new Set<ValueOf<typeof AllowedExtensions>>([
    AllowedExtensions.DOC,
    AllowedExtensions.DOCX,
    AllowedExtensions.PDF,
]);

const imageMimeTypesFilter = new Set<ValueOf<typeof AllowedMimeTypes>>([
    AllowedMimeTypes.JPEG,
    AllowedMimeTypes.PNG,
]);

const documentMimeTypesFilter = new Set<ValueOf<typeof AllowedMimeTypes>>([
    AllowedMimeTypes.PDF,
    AllowedMimeTypes.DOC,
    AllowedMimeTypes.DOCX,
]);

const fileFilter = (
    _request: FastifyRequest,
    file: MulterFile,
    callback: FileFilterCallback,
): void => {
    const fileExtension =
        file.originalname.split('.').pop()?.toLowerCase() ?? '';
    let isValidMimeType = false;

    const isDocument = documentExtensionFilter.has(
        fileExtension as ValueOf<typeof AllowedExtensions>,
    );
    const isImage = imageExtensionFilter.has(
        fileExtension as ValueOf<typeof AllowedExtensions>,
    );
    const isValidExtension = isDocument || isImage;

    switch (true) {
        case isDocument: {
            isValidMimeType = documentMimeTypesFilter.has(
                file.mimetype as ValueOf<typeof AllowedMimeTypes>,
            );
            break;
        }
        case isImage: {
            isValidMimeType = imageMimeTypesFilter.has(
                file.mimetype as ValueOf<typeof AllowedMimeTypes>,
            );
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
