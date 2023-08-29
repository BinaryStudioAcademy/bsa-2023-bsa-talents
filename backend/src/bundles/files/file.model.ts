import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class FileModel extends AbstractModel {
    public 'url': string;

    public 'file_name': string;

    public 'contentType': string;

    public static override get tableName(): string {
        return DatabaseTableName.FILES;
    }
}

export { FileModel };
