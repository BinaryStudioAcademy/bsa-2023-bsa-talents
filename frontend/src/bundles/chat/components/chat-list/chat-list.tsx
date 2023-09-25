import { formatDistanceToNowStrict } from 'date-fns';

import { Grid } from '~/bundles/common/components/components.js';
import {
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { type ChatListItemType, getSearchedItems } from '~/helpers/helpers.js';

import { ChatListItem, ChatListSearch } from './components.js';
import {
    EMPTY_ARRAY_LENGTH,
    NOT_FOUND_ELEM_KEY,
} from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onItemClick?: (id: string, items: ChatListItemType[]) => void;
};

const ChatList: React.FC<Properties> = ({ onItemClick }) => {
    const { chats, user, currentChatId } = useAppSelector(({ chat, auth }) => ({
        chats: chat.chats,
        user: auth.currentUser,
        currentChatId: chat.current.chatId,
    }));

    const [searchValue, setSearchValue] = useState('');

    const chatListMapped: ChatListItemType[] = chats.map((chat) => {
        const timeSince = formatDistanceToNowStrict(
            Date.parse(chat.lastMessageCreatedAt),
        );

        const { receiver, sender } = chat.participants;
        const partner = user?.id === receiver.id ? sender : receiver;

        return {
            chatId: chat.chatId,
            userId: user?.id as string,
            username: partner.profileName ?? '',
            lastMessage: chat.lastMessage,
            lastMessageDate: `${timeSince} ago`,
            avatar: partner.avatarUrl,
            fullName: partner.profileName ?? '',
            isSelected: currentChatId === chat.chatId,
            receiver,
            sender,
        };
    });

    const chatList = getSearchedItems(chatListMapped, searchValue);

    const selectionHandler = useCallback(
        (id: string): void => {
            if (onItemClick) {
                onItemClick(id, chatList);
            }
        },
        [onItemClick, chatList],
    );

    const renderedChatItems = chatList.map((item) => (
        <li key={item.chatId}>
            <ChatListItem onClick={selectionHandler} {...item} />
        </li>
    ));

    return (
        <Grid
            container
            component="article"
            alignContent="flex-start"
            gap="10px"
            className={styles.chatListContainer}
        >
            <ChatListSearch
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <Grid
                container
                component="ul"
                direction="column"
                wrap="nowrap"
                className={styles.chatList}
            >
                {chatList.length > EMPTY_ARRAY_LENGTH ? (
                    renderedChatItems
                ) : (
                    <li
                        key={NOT_FOUND_ELEM_KEY}
                        className={styles.nothingWasFound}
                    >
                        {'Nothing was found'}
                    </li>
                )}
            </Grid>
        </Grid>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
