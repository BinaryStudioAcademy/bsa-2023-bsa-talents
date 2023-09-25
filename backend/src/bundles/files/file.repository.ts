import { type S3 } from 'aws-sdk';

import { ErrorMessage } from '~/common/enums/enums.js';
import {
    type FileStorage,
    type MulterFile,
} from '~/common/packages/file-storage/types/types.js';
import { type Repository } from '~/common/types/repository.type.js';

import { FileEntity } from './file.entity.js';
import { type FileModel } from './file.model.js';
import { getFileType } from './helpers/get-file-type.helper.js';
import { type FileUploadResponse } from './types/types.js';

class FileRepository implements Repository {
    private fileModel: typeof FileModel;
    private fileStorage: FileStorage;

    public constructor(fileModel: typeof FileModel, fileStorage: FileStorage) {
        this.fileModel = fileModel;
        this.fileStorage = fileStorage;
    }

    public find(): Promise<unknown> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public findAll(): Promise<unknown[]> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async create(file: S3.ManagedUpload.SendData): Promise<FileModel> {
        return this.fileModel
            .query()
            .insert({
                url: file.Location,
                fileName: file.Key,
                etag: file.ETag,
            })
            .returning('*')
            .execute();
    }

    public async upload(payload: {
        files: MulterFile[];
    }): Promise<FileUploadResponse> {
        const response = await this.fileStorage.uploadFiles({ ...payload });
        const uploadedFiles: FileUploadResponse = {};

        for (const file of response) {
            const data = await this.create(file);
            const type = getFileType(file.Key);
            const entity = FileEntity.initialize(data).toObject();
            uploadedFiles[type as keyof typeof uploadedFiles] = {
                id: entity.id,
                url: entity.url,
            };
        }

        return uploadedFiles;
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { FileRepository };
