import { type File as MulterFile } from 'fastify-multer/lib/interfaces.js';

import { ErrorMessage } from '~/common/enums/enums.js';
import { type Service } from '~/common/types/types.js';

import { type FileEntity } from './file.entity.js';
import { type FileRepository } from './file.repository.js';
import { type FileUploadResponse } from './types/types.js';

class FileService implements Service {
    private fileRepository: FileRepository;

    public constructor(fileRepository: FileRepository) {
        this.fileRepository = fileRepository;
    }

    public find(): Promise<ReturnType<Service['find']>> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public findById(id: string): Promise<FileEntity | null> {
        return this.fileRepository.find({ id });
    }

    public findAll(): Promise<{ items: unknown[] }> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public create(): Promise<unknown> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public async upload(payload: {
        files: MulterFile[];
    }): Promise<FileUploadResponse> {
        return this.fileRepository.upload({ ...payload });
    }

    public update(): Promise<ReturnType<Service['update']>> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessage.NOT_IMPLEMENTED);
    }
}

export { FileService };
