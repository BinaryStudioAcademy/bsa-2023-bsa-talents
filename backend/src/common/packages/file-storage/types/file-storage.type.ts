import { type S3 } from 'aws-sdk';

type UploadParameters = {
    file: Buffer;
    newFileNameKey: string;
};

type FileStorage = {
    upload(parameters: UploadParameters): Promise<S3.ManagedUpload.SendData>;
};

export { type FileStorage };
