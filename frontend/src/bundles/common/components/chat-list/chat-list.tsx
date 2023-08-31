// import { useState } from '../../hooks/hooks.js';
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

// const handleSelect = (event: React.MouseEvent<HTMLElement>): void => {
//     // eslint-disable-next-line no-console
//     console.dir(event.target);
// };

const renderChatItems = (items: ChatListItem[]): React.ReactElement[] => {
    return items.map((item) => (
        <li key={item.userId}>
            <ChatItem {...item} />
        </li>
    ));
};

const ChatList: React.FC<Properties> = ({ chatItems }) => {
    // const [ selectedId, setSelectedId ] = useState('');

    return (
        <aside className={styles.chatListContainer}>
            <ul className={styles.chatList}>{renderChatItems(chatItems)}</ul>
        </aside>
    );
};

export { type Properties as ChatListProperties };
export { ChatList };
