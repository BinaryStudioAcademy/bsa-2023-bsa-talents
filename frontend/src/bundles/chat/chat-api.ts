import {
    ApiPath,
    ChatMessagesApiPath,
    ContentType,
} from '~/bundles/common/enums/enums.js';
import { HttpApiBase } from '~/framework/api/api.js';
import { type Http } from '~/framework/http/http.js';
import { type Storage } from '~/framework/storage/storage.js';

import {
    type ChatMessagesCreateRequestDto,
    type ChatMessagesPatchDto,
    type ChatMessagesResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
    storage: Storage;
};

class ChatApi extends HttpApiBase {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.USER_DETAILS, baseUrl, http, storage });
    }

    public async getAllMessages(): Promise<ChatMessagesResponseDto[]> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<ChatMessagesResponseDto[]>();
    }

    public async getAllMessagesByChatId(
        payload: Partial<ChatMessagesResponseDto>,
    ): Promise<ChatMessagesResponseDto[]> {
        const { chatId = '' } = payload;

        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.$CHAT_ID, chatId, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                hasAuth: true,
            },
        );
        return response.json<ChatMessagesResponseDto[]>();
    }

    public async createMessage(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<ChatMessagesResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<ChatMessagesResponseDto>();
    }

    public async readMessage(
        payload: ChatMessagesPatchDto,
    ): Promise<ChatMessagesResponseDto> {
        const { id = '' } = payload;

        const response = await this.load(
            this.getFullEndpoint(ChatMessagesApiPath.READ_$MESSAGE_ID, id, {}),
            {
                method: 'PATCH',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
                hasAuth: true,
            },
        );
        return response.json<ChatMessagesResponseDto>();
    }
}

export { ChatApi };
