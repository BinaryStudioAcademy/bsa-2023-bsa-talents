import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { formatDistanceToNowStrict } from 'date-fns';

import {
    ChatHeader,
    ChatList,
    CompanyInfo,
    MessageInput,
    MessageList,
} from '~/bundles/chat/components/components.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { type ChatListItemType } from '~/bundles/chat/types/types.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import {
    ChatInfoIcon,
    ChatListIcon,
} from '../../components/small-screen-button/components.js';
import { companyInfo } from '../../mock-data/mock-data.js';
import styles from './styles.module.scss';

const ChatsPage: React.FC = () => {
    const theme = useTheme();
    const isScreenLessMD = useMediaQuery(theme.breakpoints.down('md'));
    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isScreenLessLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [isOpenChatList, setIsOpenChatList] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);
    // const [chatMessages, setChatMessages] = useState(messages);

    const handleOpenChatListButton = useCallback(() => {
        setIsOpenChatList(!isOpenChatList);
    }, [isOpenChatList]);

    const handleOpenInfoButton = useCallback(() => {
        setIsOpenInfo(!isOpenInfo);
    }, [isOpenInfo]);

    useEffect(() => {
        !isScreenLessMD && setIsOpenChatList(false);
        !isScreenLessLG && setIsOpenInfo(false);
    }, [isScreenLessMD, isScreenLessLG]);

    const dispatch = useAppDispatch();

    const { user, chats, chatMessages, currentChatId } = useAppSelector(
        ({ auth, chat }) => ({
            user: auth.currentUser,
            chats: chat.chats,
            chatMessages: chat.current.messages,
            currentChatId: chat.current.chatId,
        }),
    );

    useEffect(() => {
        if (user) {
            void dispatch(chatActions.getAllChatsByUserId(user.id));
        }
    }, [dispatch, user]);

    // TODO: will be replaced by redux logic with server API
    const [currentChat, setCurrentChat] = useState({
        id: undefined,
        userName: 'unset',
        avatar: '',
    });

    // TODO: will be replaced by send message logic
    const sendMessage = useCallback(
        (message: string) => {
            const recieverId = chats.find(
                (chat) => chat.chatId === currentChatId,
            )?.partner.id;

            void dispatch(
                chatActions.createMessage({
                    message,
                    chatId: currentChatId as string,
                    senderId: user?.id as string,
                    receiverId: recieverId as string,
                }),
            );
        },
        [dispatch, currentChatId, chats, user?.id],
    );

    // TODO: will be replaced by redux logic with server API
    const handleItemClick = useCallback(
        (id: string, items: ChatListItemType[]) => {
            isOpenChatList && setIsOpenChatList(false);
            const participant = items.find((item) => id === item.userId);
            if (participant) {
                void dispatch(chatActions.joinRoom(participant.userId));
                void dispatch(
                    chatActions.getAllMessagesByChatId(participant.chatId),
                );
                setCurrentChat({
                    ...currentChat,
                    userName: participant.username,
                    avatar: participant.avatar ?? '',
                });
            }
        },
        [isOpenChatList, currentChat, dispatch],
    );

    const chatGroups = chats.map((chat) => {
        const timeSince = formatDistanceToNowStrict(
            Date.parse(chat.lastMessageCreatedAt),
        );

        return {
            chatId: chat.chatId,
            userId: chat.partner.id,
            username: chat.partner.profileName as string,
            lastMessage: chat.lastMessage,
            lastMessageDate: `${timeSince} ago`,
            avatar: chat.partner.avatar?.url,
            fullName: chat.partner.fullName,
        };
    });

    const messagesMapped = chatMessages.map((message) => {
        const match = chatGroups.find((it) => it.userId === message.senderId);
        return {
            id: message.id,
            userId: message.senderId,
            value: message.message,
            avatarUrl: match?.avatar,
            userFullName: match?.fullName ?? '',
        };
    });

    return (
        <Grid container direction="column">
            <Typography variant="h4" className={styles.header}>
                Chats
            </Typography>
            <Grid
                container
                wrap="nowrap"
                className={getValidClassNames(
                    styles.chatWrapper,
                    isOpenChatList && styles.chatWrapperOnChatListOpened,
                )}
            >
                {(!isScreenLessMD || isOpenChatList) && (
                    <Grid
                        className={getValidClassNames(
                            styles.chatList,
                            isScreenLessLG && styles.chatListSmall,
                            isOpenChatList && styles.componentOpenedSmallest,
                        )}
                    >
                        <ChatList
                            chatItems={chatGroups}
                            onItemClick={handleItemClick}
                        />
                    </Grid>
                )}
                <Grid
                    container
                    flexGrow={1}
                    direction="column"
                    className={styles.chatWindow}
                >
                    {isScreenLessLG && (
                        <div className={styles.smallScreenButtonGroup}>
                            {isScreenLessMD && !isOpenInfo && (
                                <ChatListIcon
                                    onClick={handleOpenChatListButton}
                                    isOpen={isOpenChatList}
                                />
                            )}

                            {!isOpenChatList && (
                                <ChatInfoIcon
                                    onClick={handleOpenInfoButton}
                                    isOpen={isOpenInfo}
                                />
                            )}
                        </div>
                    )}
                    <ChatHeader
                        title={currentChat.userName}
                        isOnline
                        className={styles.chatHeader}
                        avatarUrl={currentChat.avatar}
                    />
                    <MessageList
                        messages={messagesMapped}
                        className={styles.messageList}
                    />
                    <MessageInput
                        className={styles.chatInput}
                        onSend={sendMessage}
                    />
                </Grid>
                {(!isScreenLessLG || isOpenInfo) && (
                    <Grid
                        className={getValidClassNames(
                            styles.chatCompanyInfo,
                            isOpenInfo && styles.componentOpenedSmallest,
                            isScreenMoreMD && styles.chatInfoOpenedMD,
                        )}
                    >
                        <CompanyInfo companyData={companyInfo} />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export { ChatsPage };
