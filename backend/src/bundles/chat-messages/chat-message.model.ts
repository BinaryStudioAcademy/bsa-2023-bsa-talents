import { type JSONSchema, Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    ChatMessagesTableColumn,
    DatabaseTableName,
    UserDetailsTableColumn,
} from '~/common/packages/database/database.js';

import { UserDetailsModel } from '../user-details/user-details.model.js';
import { UserModel } from '../users/user.model.js';

class ChatMessageModel extends AbstractModel {
    public 'senderId': string;
    public 'receiverId': string;
    public 'chatId': string;
    public 'message': string;
    public 'isRead': boolean;

    public static override get tableName(): string {
        return DatabaseTableName.CHAT_MESSAGES;
    }

    public static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['senderId', 'receiverId', 'chatId', 'message'],
        properties: {
            senderId: { type: 'string', format: 'uuid' },
            receiverId: { type: 'string', format: 'uuid' },
            chatId: { type: 'string', format: 'uuid' },
            message: { type: 'string' },
            isRead: { type: 'boolean', default: false },
        },
    };

    public static get relationMappings(): RelationMappings {
        return {
            sender: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.SENDER_ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
                },
            },

            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserDetailsModel,
                join: {
                    from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.RECEIVER_ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.ID}`,
                },
            },
        };
    }
}

export { ChatMessageModel };
