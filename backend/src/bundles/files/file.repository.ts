import { ErrorMessages } from '~/common/enums/enums.js';
import { type FileStorage } from '~/common/packages/file-storage/types/types.js';
import { type Repository } from '~/common/types/repository.type.js';

import { FileEntity } from './file.entity.js';
import { type FileModel } from './file.model.js';

class FileRepository implements Repository {
    private fileModel: typeof FileModel;
    private fileStorage: FileStorage;

    public constructor(fileModel: typeof FileModel, fileStorage: FileStorage) {
        this.fileModel = fileModel;
        this.fileStorage = fileStorage;
    }

    public find(): Promise<unknown> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public findAll(): Promise<unknown[]> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(payload: {
        file: Buffer;
        newFileName: string;
    }): Promise<FileEntity> {
        const response = await this.fileStorage.upload({
            file: payload.file,
            newFileNameKey: payload.newFileName,
        });

        const file = await this.fileModel
            .query()
            .insert({
                url: response.Location,
                fileName: response.Key,
                etag: response.ETag,
            })
            .returning('*')
            .execute();

        return FileEntity.initialize(file);
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { FileRepository };
