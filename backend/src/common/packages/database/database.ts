import { config, logger } from '~/common/packages/packages.js';

import { DatabaseBase } from './database-base.package.js';

const database = new DatabaseBase(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export {
    BSABadgesTableColumn,
    ChatMessagesTableColumn,
    DatabaseTableName,
    FilesTableColumn,
    HardSkillsTableColumn,
    HiringInfoTableColumn,
    TalentBadgesTableColumn,
    TalentHardSkillsTableColumn,
    UserDetailsTableColumn,
    UserLMSDataTableColumn,
    UsersTableColumn,
} from './enums/enums.js';
export { type Database } from './types/types.js';
