import { type Message } from '~/bundles/chat/types/types.js';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useEffect, useRef } from '~/bundles/common/hooks/hooks.js';

import { MessageItem } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    messages: Message[];
    className?: string;
};

const MessageList: React.FC<Properties> = ({ messages, className }) => {
    const autoScrollElement = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messages.length > 0) {
            autoScrollElement.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
    }, [messages.length]);
    return (
        <Grid className={getValidClassNames(styles.messageList, className)}>
            {messages.map((message) => (
                <MessageItem
                    key={message.id}
                    userId={message.userId}
                    userFullName={message.userFullName}
                    avatarUrl={message.avatarUrl}
                >
                    {message.value}
                </MessageItem>
            ))}
            <div ref={autoScrollElement} className={styles.autoScrollElement} />
        </Grid>
    );
};

export { MessageList };
