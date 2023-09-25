import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
    ChatHeader,
    ChatList,
    CompanyInfo,
    MessageInput,
    MessageList,
} from '~/bundles/chat/components/components.js';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import {
    type ChatListItemType,
    type ChatResponseDto,
} from '~/bundles/chat/types/types.js';
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
import { getChatHeaderProps as getChatHeaderProperties } from '../../helpers/get-chat-header-props.js';
import styles from './styles.module.scss';

const ChatsPage: React.FC = () => {
    const theme = useTheme();
    const isScreenLessMD = useMediaQuery(theme.breakpoints.down('md'));
    const isScreenMoreMD = useMediaQuery(theme.breakpoints.up('md'));
    const isScreenLessLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [isOpenChatList, setIsOpenChatList] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState(false);

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

    const { user, chats, currentChatId } = useAppSelector(({ auth, chat }) => ({
        user: auth.currentUser,
        chats: chat.chats,
        currentChatId: chat.current.chatId,
    }));

    //  Get list of all chats this user is participating in and store:
    useEffect(() => {
        const id = user?.id;
        const joinChats = async (): Promise<void> => {
            const chatData = await dispatch(
                chatActions.getAllChatsByUserId(id as string),
            );
            const userChats = chatData.payload as ChatResponseDto[];

            for (const chat of userChats) {
                void dispatch(
                    chatActions.joinRoom({
                        userId: user?.id,
                        chatId: chat.chatId,
                    }),
                );
            }
        };

        if (id) {
            void joinChats();
        }

        /**
         *  TODO: This is an issue that needs to be fixed.
         *
         * This exitChats cleanup function does not fire when navigating away
         * from page using the address bar (url). This means that even though
         * user has left page, in the server user is still connected to the rooms.
         *
         * However, this cleanup function works when navigating away from chats page
         * using links / buttons located on the page.
         */

        const exitChats = async (): Promise<void> => {
            const chatData = await dispatch(
                chatActions.getAllChatsByUserId(id as string),
            );
            const userChats = chatData.payload as ChatResponseDto[];

            for (const chat of userChats) {
                void dispatch(
                    chatActions.leaveRoom({
                        userId: user?.id,
                        chatId: chat.chatId,
                    }),
                );
            }
        };

        return () => {
            void exitChats();
        };
    }, [dispatch, user?.id]);

    const { chatHeaderName, chatHeaderAvatar } = getChatHeaderProperties({
        chats,
        selectedId: currentChatId,
        userId: user?.id,
    });

    // TODO: will be replaced by redux logic with server API
    const handleItemClick = useCallback(
        (id: string, items: ChatListItemType[]) => {
            isOpenChatList && setIsOpenChatList(false);
            const room = items.find((item) => id === item.chatId);
            const { sender, receiver } = room as ChatListItemType;

            let employerId: string;

            if (user?.role === 'employer') {
                employerId = user.id;
            } else {
                employerId = user?.id === sender.id ? receiver.id : sender.id;
            }

            if (room) {
                void dispatch(
                    chatActions.getAllMessagesByChatId({
                        chatId: room.chatId,
                        employerId,
                    }),
                );
            }
        },
        [isOpenChatList, dispatch, user?.id, user?.role],
    );

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
                        <ChatList onItemClick={handleItemClick} />
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
                        title={chatHeaderName}
                        isOnline
                        className={styles.chatHeader}
                        avatarUrl={chatHeaderAvatar}
                    />
                    <MessageList className={styles.messageList} />
                    <MessageInput className={styles.chatInput} />
                </Grid>
                {(!isScreenLessLG || isOpenInfo) && (
                    <Grid
                        className={getValidClassNames(
                            styles.chatCompanyInfo,
                            isOpenInfo && styles.componentOpenedSmallest,
                            isScreenMoreMD && styles.chatInfoOpenedMD,
                        )}
                    >
                        <CompanyInfo />
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export { ChatsPage };
