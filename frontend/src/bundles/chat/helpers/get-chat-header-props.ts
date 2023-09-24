import { type ChatResponseDto } from '../types/types.js';

type Return = {
    chatHeaderAvatar: string;
    chatHeaderName: string;
};

const getChatHeaderProperties = ({
    chats,
    selectedId,
    userId,
}: {
    chats: ChatResponseDto[];
    selectedId: string | null;
    userId: string | undefined;
}): Return => {
    const match = chats.find((it) => it.chatId === selectedId);
    const returnObject: Return = {
        chatHeaderAvatar: '',
        chatHeaderName: '',
    };

    if (match) {
        const { receiver, sender } = match.participants;
        const isUserSender = userId === sender.id;

        returnObject.chatHeaderAvatar = isUserSender
            ? receiver.avatarUrl
            : sender.avatarUrl;
        returnObject.chatHeaderName =
            (isUserSender ? receiver.profileName : sender.profileName) ?? '';
    }

    return returnObject;
};

export { getChatHeaderProperties as getChatHeaderProps };
