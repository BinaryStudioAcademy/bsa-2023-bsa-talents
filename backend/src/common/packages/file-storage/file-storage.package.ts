import AWS from 'aws-sdk';
import { type PutObjectRequest } from 'aws-sdk/clients/s3.js';

import { config } from '../config/config.js';
import { type FileStorage } from './types/types.js';

class FileStorageBase implements FileStorage {
    private s3: AWS.S3;
    private bucketName: string;

    public constructor() {
        this.s3 = new AWS.S3({
            credentials: {
                accessKeyId: config.ENV.AWS.AWS_ACCESS_KEY_ID,
                secretAccessKey: config.ENV.AWS.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = config.ENV.AWS.AWS_BUCKET_NAME;
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
