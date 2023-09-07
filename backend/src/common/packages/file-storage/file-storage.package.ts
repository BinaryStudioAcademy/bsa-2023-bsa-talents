import AWS from 'aws-sdk';
import { type PutObjectRequest } from 'aws-sdk/clients/s3.js';

import { type FileStorage } from './types/types.js';

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

    public async upload({
        file,
        newFileNameKey,
    }: {
        file: Buffer;
        newFileNameKey: string;
    }): Promise<AWS.S3.ManagedUpload.SendData> {
        try {
            const parameters: PutObjectRequest = {
                Bucket: this.bucketName,
                Key: newFileNameKey,
                Body: file,
            };

            return this.s3.upload(parameters).promise();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export { FileStorageBase };
