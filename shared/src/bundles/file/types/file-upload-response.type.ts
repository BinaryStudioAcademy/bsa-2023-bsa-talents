import { type UploadedFile } from './uploaded-file.type.js';

type FileUploadResponse = {
    document: UploadedFile;
    image: UploadedFile;
};

export { type FileUploadResponse };
