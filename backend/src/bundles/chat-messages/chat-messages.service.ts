import { ErrorMessages } from '~/common/enums/enums.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/service.type.js';

import { type ChatMessagesRepository } from './chat-messages.repository.js';
import {
    type ChatMessagesCreateRequestDto,
    type ChatResponseDto,
    type MessageResponseDto,
} from './types/types.js';

class ChatMessagesService implements Service {
    private chatMessagesRepository: ChatMessagesRepository;

    public constructor(chatMessagesRepository: ChatMessagesRepository) {
        this.chatMessagesRepository = chatMessagesRepository;
    }

    public find(): Promise<unknown | null> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public async findAll(): Promise<{
        items: MessageResponseDto[];
    }> {
        const messages = await this.chatMessagesRepository.findAll();

        return {
            items: messages.map((message) => message.toObject()),
        };
    }

    public async findAllMessagesByChatId(chatId: string): Promise<{
        items: MessageResponseDto[];
    }> {
        const messages =
            await this.chatMessagesRepository.findAllMessagesByChatId(chatId);

        return {
            items: messages.map((message) => message.toObject()),
        };
    }

    public async findAllChatsByUserId(userId: string): Promise<{
        items: (ChatResponseDto & {
            selfPhoto: { url: string | null } | null;
        })[];
    }> {
        const chats = await this.chatMessagesRepository.findAllChatsByUserId(
            userId,
        );

        const parsedChats = chats.map((chat) => {
            const {
                chatId,
                lastMessageCreatedAt,
                lastMessage,
                sender,
                receiver,
            } = chat;

            const conversationPartner =
                userId === sender.userId ? receiver : sender;

            const yourself = userId === sender.userId ? sender : receiver;

            // Get necessary fields from user details model
            const {
                userId: id,
                profileName,
                fullName,
                linkedinLink,
                companyName,
                companyLogoId,
                companyWebsite,
                photo,
            } = conversationPartner;

            // Get necessary fields from file model
            const photoData = photo
                ? {
                      url: photo.url,
                      fileName: photo.fileName,
                      etag: photo.etag,
                  }
                : null;

            const selfPhoto = yourself.photo
                ? {
                      url: yourself.photo.url,
                  }
                : null;

            return {
                chatId,
                lastMessageCreatedAt,
                lastMessage,
                selfPhoto,
                partner: {
                    id,
                    profileName,
                    fullName,
                    linkedinLink,
                    companyName,
                    companyLogoId,
                    companyWebsite,
                    avatar: photoData, // TODO: change photo url logic after testing file uploading
                },
            };
        });

        return {
            items: parsedChats,
        };
    }

    public async create(
        payload: ChatMessagesCreateRequestDto,
    ): Promise<MessageResponseDto> {
        const isFirstMessage = !payload.chatId;

        if (isFirstMessage) {
            const chats =
                await this.chatMessagesRepository.findAllChatsByUserId(
                    payload.senderId,
                );

            for (const chat of chats) {
                if (chat.receiver.userId === payload.receiverId) {
                    throw new HttpError({
                        message: 'You already have this conversation.',
                        status: HttpCode.CONFLICT,
                    });
                }
            }
        }

        const newMessage = await this.chatMessagesRepository.create(payload);

        return newMessage.toObject();
    }

    public async read(messageId: string): Promise<MessageResponseDto> {
        const patchedMessage = await this.chatMessagesRepository.patch({
            id: messageId,
            isRead: true,
        });
        return patchedMessage.toObject();
    }

    public update(): Promise<unknown> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }

    public delete(): Promise<boolean> {
        throw new Error(ErrorMessages.NOT_IMPLEMENTED);
    }
}

export { ChatMessagesService };
