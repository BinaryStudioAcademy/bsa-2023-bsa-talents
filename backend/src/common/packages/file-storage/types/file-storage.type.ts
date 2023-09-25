import { type S3 } from 'aws-sdk';
import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';

type UploadParameters = {
    files: MulterFile[];
};

type FileStorage = {
    uploadFiles(
        parameters: UploadParameters,
    ): Promise<S3.ManagedUpload.SendData[]>;
};

export { type FileStorage };
