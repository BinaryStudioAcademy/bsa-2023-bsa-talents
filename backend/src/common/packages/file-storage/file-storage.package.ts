import fs from 'node:fs';
import path from 'node:path';

import AWS from 'aws-sdk';
import { type PutObjectRequest } from 'aws-sdk/clients/s3.js';

import { config } from '../config/config.js';

class FileStorage {
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
        filePath,
        newFileNameKey = '',
    }: {
        filePath: string;
        newFileNameKey?: string;
    }): Promise<void> {
        const newFileName = newFileNameKey || path.basename(filePath);

        try {
            const fileStream = fs.createReadStream(filePath);

            const parameters: PutObjectRequest = {
                Bucket: this.bucketName,
                Key: newFileName,
                Body: fileStream,
            };

            await this.s3.upload(parameters).promise();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // TODO: Get file?
    // async get(filePath: string) {
    //     const params = {
    //         Bucket: this.bucketName,
    //         Key: filePath
    //     }

    //     try {
    //         const x = await this.s3.getObject(params).promise()
    //         console.log('testx: ', x.Body?.toString('utf-8'));
    //     } catch (error) {
    //         console.log('ERROR: ', error)
    //     }
    // }
}

const fileStorage = new FileStorage();

export { fileStorage };
