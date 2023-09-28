import { type Entity } from '~/common/types/types.js';

import { type GetFileResponseDto } from './types/types.js';

class FileEntity implements Entity {
    private 'id': string | null;

    private 'url': string;

    private 'fileName': string;

    private 'etag': string;

    private constructor({
        id,
        url,
        fileName,
        etag,
    }: {
        id: string | null;
        url: string;
        fileName: string;
        etag: string;
    }) {
        this.id = id;
        this.url = url;
        this.fileName = fileName;
        this.etag = etag;
    }

    public static initialize({
        id,
        url,
        fileName,
        etag,
    }: GetFileResponseDto): FileEntity {
        return new FileEntity({
            id,
            url,
            fileName,
            etag,
        });
    }

    public static initializeNew({
        url,
        fileName,
        etag,
    }: {
        url: string;
        fileName: string;
        etag: string;
    }): FileEntity {
        return new FileEntity({
            id: null,
            url,
            fileName,
            etag,
        });
    }

    public toObject(): {
        id: string;
        url: string;
    } {
        return {
            id: this.id as string,
            url: this.url,
        };
    }

    public toNewObject(): {
        url: string;
        fileName: string;
        etag: string;
    } {
        return {
            url: this.url,
            fileName: this.fileName,
            etag: this.etag,
        };
    }
}

export { FileEntity };
