import { useCallback, useEffect, useState } from '../../hooks/hooks.js';
import { Grid } from '../components.js';
import { ChatListItem, ChatListSearch } from './components.js';
import styles from './styles.module.scss';

const EMPTY_ARRAY = 0;

type ChatListItemType = {
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    itemSelected?: boolean;
};

type Properties = {
    chatItems: ChatListItemType[];
};

const getItemsWithSelected = (
    items: ChatListItemType[],
    id: string,
): ChatListItemType[] => {
    return items.map((item) => {
        if (item.userId !== id) {
            item.itemSelected = false;
            return item;
        }
        item.itemSelected = true;
        return item;
    });
};

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

    const renderChatItems = (
        items: ChatListItemType[],
    ): React.ReactElement[] => {
        return items.length > EMPTY_ARRAY
            ? items.map((item) => (
                  <li key={item.userId}>
                      <ChatListItem onClick={selectionHandler} {...item} />
                  </li>
              ))
            : [
                  <li key={0} className={styles.nothingWasFound}>
                      {'Nothing was found'}
                  </li>,
              ];
    };

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
                {renderChatItems(items)}
            </Grid>
        </Grid>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
