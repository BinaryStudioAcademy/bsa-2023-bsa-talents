import { type UploadedFile } from 'shared/build/index';

type FileUploadResponse = {
    rn?: UploadedFile | undefined;
    companyLogo?: UploadedFile | undefined;
    cv?: UploadedFile | undefined;
};
export { type FileUploadResponse };
