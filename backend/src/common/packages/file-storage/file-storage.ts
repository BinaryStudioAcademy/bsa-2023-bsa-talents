import { config } from '../config/config.js';
import { FileStorageBase } from './file-storage.package.js';

const { AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, AWS_SECRET_ACCESS_KEY } =
    config.ENV.AWS;

const fileStorage = new FileStorageBase({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    bucketName: AWS_BUCKET_NAME,
});

export { fileStorage };
