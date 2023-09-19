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
    FileSize,
} from './enums/enums.js';

const storage = multer.memoryStorage();
const ImageExtensionFilter = new Set([
    AllowedExtensions.JPG,
    AllowedExtensions.JPEG,
    AllowedExtensions.PNG,
]);
const DocumentExtensionFilter = new Set([
    AllowedExtensions.DOC,
    AllowedExtensions.DOCX,
    AllowedExtensions.PDF,
]);

const ImageMimeTypesFilter = new Set([
    AllowedMimeTypes.JPEG,
    AllowedMimeTypes.PNG,
]);

const DocumentMimeTypesFilter = new Set([
    AllowedMimeTypes.PDF,
    AllowedMimeTypes.DOC,
    AllowedMimeTypes.DOCX,
]);

const fileFilter = (
    request: FastifyRequest,
    file: MulterFile,
    callback: FileFilterCallback,
): void => {
    const fileExtension =
        file.originalname.split('.').pop()?.toLowerCase() ?? '';

    let isValidMimeType = false;

    const isDocument = DocumentExtensionFilter.has(fileExtension);
    const isImage = ImageExtensionFilter.has(fileExtension);
    const isValidExtension = isDocument || isImage;

    switch (true) {
        case isDocument: {
            isValidMimeType = DocumentMimeTypesFilter.has(file.mimetype);
            break;
        }
        case isImage: {
            isValidMimeType = ImageMimeTypesFilter.has(file.mimetype);
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
