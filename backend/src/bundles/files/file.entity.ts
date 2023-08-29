import { type Entity } from '~/common/types/types.js';

class FileEntity implements Entity {
    private 'id': string | null;

    private 'url': string;

    private 'fileName': string;

    private 'contentType': string;

    private constructor({
        id,
        url,
        fileName,
        contentType,
    }: {
        id: string | null;
        url: string;
        fileName: string;
        contentType: string;
    }) {
        this.id = id;
        this.url = url;
        this.fileName = fileName;
        this.contentType = contentType;
    }

    public static initialize({
        id,
        url,
        fileName,
        contentType,
    }: {
        id: string;
        url: string;
        fileName: string;
        contentType: string;
    }): FileEntity {
        return new FileEntity({
            id,
            url,
            fileName,
            contentType,
        });
    }

    public static initializeNew({
        url,
        fileName,
        contentType,
    }: {
        url: string;
        fileName: string;
        contentType: string;
    }): FileEntity {
        return new FileEntity({
            id: null,
            url,
            fileName,
            contentType,
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
        contentType: string;
    } {
        return {
            url: this.url,
            fileName: this.fileName,
            contentType: this.contentType,
        };
    }
}

export { FileEntity };
