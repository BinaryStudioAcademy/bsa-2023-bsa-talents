import { type FileRole } from '../enums/file-role.enum.js';
import { type UploadedFile } from './uploaded-file.type.js';

type FileUploadResponse = {
    [FileRole.COMPANY_LOGO]?: UploadedFile;
    [FileRole.CV]?: UploadedFile;
    [FileRole.EMPLOYER_PHOTO]?: UploadedFile;
    [FileRole.TALENT_PHOTO]?: UploadedFile;
};
export { type FileUploadResponse };
