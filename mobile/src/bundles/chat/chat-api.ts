import {
    type ChatMessagesCreateRequestDto,
    type ChatMessagesPatchDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from '~/bundles/chat/types/types';
import {
    ApiPath,
    ChatMessagesApiPath,
    ContentType,
} from '~/bundles/common/enums/enums';
import { HttpApiBase } from '~/framework/api/api';
import { type Http } from '~/framework/http/http';
import { type Storage } from '~/framework/storage/storage';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ChatApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.CHAT_MESSAGES, baseUrl, http, storage });
    }

    public async getAllMessages(): Promise<{ items: MessageResponseDto[] }> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<{ items: MessageResponseDto[] }>();
    }

    public async getAllChatsByUserId(payload: string): Promise<{
        items: ChatResponseDto[];
    }> {
        const path = ChatMessagesApiPath.CHATS_$USER_ID.replace(
            ':userId',
            payload,
        );
        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'GET',
            contentType: ContentType.JSON,
            hasAuth: true,
        });
        return await response.json<{ items: ChatResponseDto[] }>();
    }

    public async getAllMessagesByChatId(payload: string): Promise<{
        items: MessageResponseDto[];
    }> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, payload, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return await response.json<{ items: MessageResponseDto[] }>();
    }

    public async createMessage(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<MessageResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return await response.json<MessageResponseDto>();
    }

    public async readMessage(
        payload: ChatMessagesPatchDto,
    ): Promise<MessageResponseDto> {
        const path = ChatMessagesApiPath.READ_$MESSAGE_ID.replace(
            ':messageId',
            payload.id,
        );
        const response = await this.load(this.getFullEndpoint(path, {}), {
            method: 'PATCH',
            contentType: ContentType.JSON,
            payload: JSON.stringify(payload),
            hasAuth: true,
        });
        return await response.json<MessageResponseDto>();
    }
}

export { ChatApi };
