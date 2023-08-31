import { useCallback, useState } from '../../hooks/hooks.js';
import { ChatItem } from './components.js';
import styles from './styles.module.scss';

type ChatListItem = {
    userId: string;
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatar?: string;
    itemSelected?: boolean;
};

type Properties = {
    chatItems: ChatListItem[];
};

const getItemsWithSelected = (
    items: ChatListItem[],
    id: string,
): ChatListItem[] => {
    return items.map((item) => {
        if (item.userId !== id) {
            item.itemSelected = false;
            return item;
        }
        item.itemSelected = true;
        return item;
    });
};

const ChatList: React.FC<Properties> = ({ chatItems }) => {
    const [items, setItems] = useState(chatItems);

    const selectionHandler = useCallback(
        (id: string): void => {
            setItems(getItemsWithSelected(items, id));
        },
        [items],
    );

    const renderChatItems = (items: ChatListItem[]): React.ReactElement[] => {
        return items.map((item) => (
            <li key={item.userId}>
                <ChatItem onClick={selectionHandler} {...item} />
            </li>
        ));
    };

    return (
        <aside className={styles.chatListContainer}>
            <ul className={styles.chatList}>{renderChatItems(items)}</ul>
        </aside>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
