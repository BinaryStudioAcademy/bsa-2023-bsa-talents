import { Grid } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type ChatListItemType,
    getItemsWithSelected,
    getSearchedItems,
} from '~/helpers/helpers.js';

import { ChatListItem, ChatListSearch } from './components.js';
import {
    EMPTY_ARRAY_LENGTH,
    NOT_FOUND_ELEM_KEY,
} from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    chatItems: ChatListItemType[];
    onItemClick?: (id: string) => void;
};

const ChatList: React.FC<Properties> = ({ chatItems, onItemClick }) => {
    const [items, setItems] = useState(chatItems);
    const [searchValue, setSearchValue] = useState('');

    const handleSelection = useCallback(
        (id: string): void => {
            setItems(getItemsWithSelected(items, id));
            if (onItemClick) {
                onItemClick(id);
            }
        },
        [items, onItemClick],
    );

    useEffect((): void => {
        setItems(getSearchedItems(chatItems, searchValue));
    }, [chatItems, searchValue]);

    const renderChatItems = useMemo((): React.ReactElement[] => {
        return items.length > EMPTY_ARRAY_LENGTH
            ? items.map((item) => (
                  <li key={item.userId}>
                      <ChatListItem onClick={handleSelection} {...item} />
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
    }, [items, handleSelection]);

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
                {renderChatItems}
            </Grid>
        </Grid>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
