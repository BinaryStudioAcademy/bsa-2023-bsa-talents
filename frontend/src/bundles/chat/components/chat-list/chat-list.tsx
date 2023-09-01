import { Grid } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { ChatListItem, ChatListSearch } from './components.js';
import {
    EMPTY_ARRAY_LENGTH,
    NOT_FOUND_ELEM_KEY,
} from './constants/constants.js';
import styles from './styles.module.scss';

type ChatListItemType = {
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    isSelected?: boolean;
};

type Properties = {
    chatItems: ChatListItemType[];
};

// must be replaced by helper
const getItemsWithSelected = (
    items: ChatListItemType[],
    id: string,
): ChatListItemType[] => {
    return items.map((item) => ({
        ...item,
        isSelected: item.userId === id,
    }));
};

// must be replaced by helper
const getSearchedItems = (
    items: ChatListItemType[],
    query: string,
): ChatListItemType[] => {
    return query
        ? items.filter((item) => item.username.includes(query))
        : items;
};

const ChatList: React.FC<Properties> = ({ chatItems }) => {
    const [items, setItems] = useState(chatItems);
    const [searchValue, setSearchValue] = useState('');

    const selectionHandler = useCallback(
        (id: string): void => {
            setItems(getItemsWithSelected(items, id));
        },
        [items],
    );

    useEffect((): void => {
        setItems(getSearchedItems(chatItems, searchValue));
    }, [chatItems, searchValue]);

    const renderChatItems = useMemo((): React.ReactElement[] => {
        return items.length > EMPTY_ARRAY_LENGTH
            ? items.map((item) => (
                  <li key={item.userId}>
                      <ChatListItem onClick={selectionHandler} {...item} />
                  </li>
              ))
            : [
                  <li
                      key={NOT_FOUND_ELEM_KEY}
                      className={styles.nothingWasFound}
                  >
                      {'Nothing was found'}
                  </li>,
              ];
    }, [items, selectionHandler]);

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
                gap="8px"
                wrap="nowrap"
                className={styles.chatList}
            >
                {renderChatItems}
            </Grid>
        </Grid>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
