import AWS from 'aws-sdk';

import { generateRandomId } from '~/bundles/files/helpers/generate-random-id.helper.js';

import { ErrorMessage } from './enums/enums.js';
import {
    type FileStorage,
    type MulterFile,
    type PutObjectRequest,
} from './types/types.js';

type ConstructorParameters = {
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
};

class FileStorageBase implements FileStorage {
    private s3: AWS.S3;
    private bucketName: string;

    public constructor({
        accessKeyId,
        secretAccessKey,
        bucketName,
    }: ConstructorParameters) {
        this.s3 = new AWS.S3({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });
        this.bucketName = bucketName;
    }

    public async uploadFiles(payload: {
        files: MulterFile[];
    }): Promise<AWS.S3.ManagedUpload.SendData[]> {
        const uploadPromises: Promise<AWS.S3.ManagedUpload.SendData>[] = [];

        payload.files.map((file) => {
            const { originalname, buffer } = file;
            uploadPromises.push(
                this.upload({
                    fileName: originalname,
                    file: buffer as Buffer,
                }),
            );
        });

        return Promise.all(uploadPromises);
    }

    public upload({
        fileName,
        file,
    }: {
        fileName: string;
        file: Buffer;
    }): Promise<AWS.S3.ManagedUpload.SendData> {
        const parameters: PutObjectRequest = {
            Bucket: this.bucketName,
            Key: generateRandomId(fileName),
            Body: file,
        };

        try {
            return this.s3.upload(parameters).promise();
        } catch {
            throw new Error(ErrorMessage.FILE_UPLOAD_ERROR);
        }
    }
}

export { FileStorageBase };
