// import styles from './styles.module.scss';
import { ChatItem, type ChatItemProperties } from './components.js';

type Properties = {
    chatItems: ChatItemProperties[];
};

const renderChatItems = (items: ChatItemProperties[]): React.ReactElement[] => {
    return items.map((item, index) => (
        <li key={index}>
            <ChatItem username={item.username} />
        </li>
    ));
};

const ChatList: React.FC<Properties> = ({ chatItems }) => {
    return <ul>{renderChatItems(chatItems)}</ul>;
};

export { type Properties as ChatListProperties };
export { ChatList };
