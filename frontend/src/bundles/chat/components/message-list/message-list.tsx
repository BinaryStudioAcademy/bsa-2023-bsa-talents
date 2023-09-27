import { type ChatParticipantDto } from '~/bundles/chat/types/types.js';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppSelector,
    useEffect,
    useRef,
} from '~/bundles/common/hooks/hooks.js';

import { NO_CHATS, NO_MESSAGES } from '../../constants/constants.js';
import { MessageItem } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
};

const MessageList: React.FC<Properties> = ({ className }) => {
    const autoScrollElement = useRef<HTMLDivElement>(null);

    const { chatMessages, chats, currentChatId, isLoading } = useAppSelector(
        ({ chat }) => ({
            chatMessages: chat.current.messages,
            chats: chat.chats,
            currentChatId: chat.current.chatId,
            isLoading: chat.dataStatus === 'pending',
        }),
    );

    let receiver: ChatParticipantDto = {
        id: '',
        profileName: '',
        companyName: '',
        avatarUrl: '',
    };
    let sender: ChatParticipantDto = {
        id: '',
        profileName: '',
        companyName: '',
        avatarUrl: '',
    };

    const selectedChat = chats.find((chat) => chat.chatId === currentChatId);

    if (selectedChat) {
        receiver = selectedChat.participants.receiver;
        sender = selectedChat.participants.sender;
    }

    const messages = chatMessages.map((message) => {
        const match = message.senderId === sender.id ? sender : receiver;
        return {
            chatId: message.chatId,
            id: message.id,
            userId: message.senderId,
            value: message.message,
            userFullName: match.profileName as string,
            avatar: match.avatarUrl,
        };
    });

    useEffect(() => {
        if (messages.length > NO_MESSAGES) {
            autoScrollElement.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, [messages.length]);
    return chats.length > NO_CHATS ? (
        <Grid className={getValidClassNames(styles.messageList, className)}>
            {messages.map((message) => (
                <MessageItem
                    key={message.id}
                    userId={message.userId}
                    userFullName={message.userFullName}
                    avatarUrl={message.avatar}
                >
                    {message.value}
                </MessageItem>
            ))}
            <div ref={autoScrollElement} className={styles.autoScrollElement} />
        </Grid>
    ) : (
        !isLoading && (
            <Grid
                className={getValidClassNames(styles.messageList, styles.empty)}
            >
                <p className={styles.placeholder}>
                    There are no active conversations yet. When employers want
                    to contact you, all chats will be here
                </p>
            </Grid>
        )
    );
};

export { MessageList };
