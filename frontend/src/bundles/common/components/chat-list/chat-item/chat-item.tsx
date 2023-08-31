// import styles from './styles.module.scss';

type Properties = {
    username: string;
    lastMessage?: string;
    lastMessageDate?: string;
    avatarImageSrc?: string;
};

const ChatItem: React.FC<Properties> = ({
    username,
    lastMessage,
    lastMessageDate,
    avatarImageSrc,
}) => {
    return (
        <div>
            <span> {username} </span>
            <span> {lastMessage} </span>
            <span> {lastMessageDate} </span>
            <span> {avatarImageSrc} </span>
        </div>
    );
};

export { type Properties as ChatItemProperties };
export { ChatItem };
