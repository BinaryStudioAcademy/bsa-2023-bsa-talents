import { type JSONSchema, Model, type RelationMappings } from 'objection';

import {
    AbstractModel,
    ChatMessagesTableColumn,
    DatabaseTableName,
    UserDetailsTableColumn,
} from '~/common/packages/database/database.js';

import { UserDetailsModel } from '../user-details/user-details.model.js';

class ChatMessageModel extends AbstractModel {
    public 'senderId': string;
    public 'receiverId': string;
    public 'chatId': string;
    public 'message': string;
    public 'isRead': boolean;

    public 'lastMessageCreatedAt'?: string;
    public 'lastMessage'?: string;
    public 'sender'?: UserDetailsModel;
    public 'receiver'?: UserDetailsModel;

    public static override get tableName(): string {
        return DatabaseTableName.CHAT_MESSAGES;
    }

    public static jsonSchema: JSONSchema = {
        type: 'object',
        required: ['senderId', 'receiverId', 'message'],
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
                modelClass: UserDetailsModel,
                filter: (query) =>
                    query.select(
                        'userId',
                        'fullName',
                        'companyName',
                        'companyLogoId',
                        'companyWebsite',
                        'description',
                        'linkedinLink',
                    ),
                join: {
                    from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.SENDER_ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
                },
            },

            receiver: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserDetailsModel,
                filter: (query) =>
                    query.select(
                        'userId',
                        'fullName',
                        'companyName',
                        'companyLogoId',
                        'companyWebsite',
                        'description',
                        'linkedinLink',
                    ),
                join: {
                    from: `${DatabaseTableName.CHAT_MESSAGES}.${ChatMessagesTableColumn.RECEIVER_ID}`,
                    to: `${DatabaseTableName.USER_DETAILS}.${UserDetailsTableColumn.USER_ID}`,
                },
            },
        };
    }
}

export { ChatMessageModel };
