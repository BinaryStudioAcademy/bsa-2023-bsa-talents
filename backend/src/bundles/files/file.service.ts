import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type FileEntity } from './file.entity.js';
import { type FileRepository } from './file.repository.js';

class FileService implements Service {
    private fileRepository: FileRepository;

    public constructor(fileRepository: FileRepository) {
        this.fileRepository = fileRepository;
    }

    public find(): Promise<ReturnType<Service['find']>> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async create(payload: {
        file: Buffer;
        newFileName: string;
    }): Promise<FileEntity> {
        return this.fileRepository.create({ ...payload });
    }

    public update(): Promise<ReturnType<Service['update']>> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { FileService };
