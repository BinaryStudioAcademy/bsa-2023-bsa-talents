import { type JSONSchema, Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    ChatsTableColumn,
    DatabaseTableName,
    UsersTableColumn,
} from '~/common/packages/database/database.js';
import { ChatMessagesTableColumn } from '~/common/packages/database/enums/table-columns/chat-messages-table-column.enum.js';

import { ChatMessageModel } from '../chat-messages/chat-messages.js';
import { UserModel } from '../users/user.model.js';

class ChatModel extends AbstractModel {
    public 'ownerId': string;
    public 'participantId': string;
    public 'name': string;

    public static override get tableName(): string {
        return DatabaseTableName.CHATS;
    }

    public static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['ownerId', 'participantId', 'name'],
        properties: {
            ownerId: { type: 'string', format: 'uuid' },
            participantId: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
        },
    };

    public static get relationMappings(): RelationMappings {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CHATS}.${ChatsTableColumn.OWNER_ID}`,
                    to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
                },
            },
            participant: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CHATS}.${ChatsTableColumn.PARTICIPANT_ID}`,
                    to: `${DatabaseTableName.USERS}.${UsersTableColumn.ID}`,
                },
            },
            messages: {
                relation: Model.HasManyRelation,
                modelClass: ChatMessageModel,
                join: {
                    from: `${DatabaseTableName.CHATS}.${ChatsTableColumn.ID}`,
                    to: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.CHAT_ID}`,
                },
            },
        };
    }
}

export { ChatModel };
