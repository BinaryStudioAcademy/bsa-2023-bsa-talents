import { ErrorMessages } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type FileRepository } from './file.repository.js';
import { type FileUploadResponse } from './types/types.js';

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
    }): Promise<FileUploadResponse> {
        const result = await this.fileRepository.create({ ...payload });
        return result.toObject();
    }

    public update(): Promise<ReturnType<Service['update']>> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { FileService };
