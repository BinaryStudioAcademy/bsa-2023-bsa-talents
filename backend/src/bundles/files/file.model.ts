import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/packages/database/database.js';

class FileModel extends AbstractModel {
    public 'url': string;

    public 'fileName': string;

    public 'contentType': string;

    public static override get tableName(): string {
        return DatabaseTableName.FILES;
    }
}

export { FileModel };
