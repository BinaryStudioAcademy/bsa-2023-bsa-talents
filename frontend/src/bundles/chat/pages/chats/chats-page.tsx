import { Close, PersonSearch } from '@mui/icons-material';
import { IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import {
    ChatHeader,
    ChatList,
    MessageInput,
    MessageList,
} from '~/bundles/chat/components/components.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { currentUser, items, messages } from '../../mock-data/mock-data.js';
import styles from './styles.module.scss';

const ChatsPage: React.FC = () => {
    const theme = useTheme();
    const isScreenLessMD = useMediaQuery(theme.breakpoints.down('md'));
    const isScreenLessLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [isOpenChatList, setIsOpenChatList] = useState(false);
    const [chatMessages, setChatMessages] = useState(messages);

    const handleOpenChatListButton = useCallback(() => {
        setIsOpenChatList(!isOpenChatList);
    }, [isOpenChatList]);

    useEffect(() => {
        setIsOpenChatList(false);
    }, [isScreenLessMD]);

    // TODO: will be replaced by redux logic with server API
    const [currentChat, setCurrentChat] = useState({
        id: undefined,
        userName: 'unset',
        avatar: '',
    });

    // TODO: will be replaced by send message logic
    const sendMessage = useCallback(
        (message: string) => {
            setChatMessages([
                ...chatMessages,
                {
                    ...currentUser,
                    value: message,
                },
            ]);
        },
        [chatMessages],
    );

    // TODO: will be replaced by redux logic with server API
    const handleItemClick = useCallback(
        (id: string) => {
            isOpenChatList && setIsOpenChatList(false);
            const participant = items.find((item) => id === item.userId);
            if (participant) {
                setCurrentChat({
                    ...currentChat,
                    userName: participant.username,
                    avatar: participant.avatar ?? '',
                });
            }
        },
        [isOpenChatList, currentChat],
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
                            isOpenChatList && styles.chatListOpened,
                        )}
                    >
                        <ChatList
                            chatItems={items}
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
                    {isScreenLessMD && (
                        <div className={styles.openChatListButtonWrapper}>
                            <IconButton onClick={handleOpenChatListButton}>
                                {isOpenChatList ? (
                                    <Close fontSize="large" />
                                ) : (
                                    <PersonSearch fontSize="large" />
                                )}
                            </IconButton>
                        </div>
                    )}
                    <ChatHeader
                        title={currentChat.userName}
                        isOnline
                        className={styles.chatHeader}
                        avatarUrl={currentChat.avatar}
                    />
                    <MessageList
                        messages={chatMessages}
                        className={styles.messageList}
                    />
                    <MessageInput
                        className={styles.chatInput}
                        onSend={sendMessage}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { ChatsPage };
