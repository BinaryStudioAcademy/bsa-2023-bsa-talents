import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { MessageItem } from '../components.js';
import styles from './styles.module.scss';

type Message = {
    id: string;
    userId: string;
    value: string;
    avatarUrl?: string;
    userFullName: string;
};

type Properties = {
    messages: Message[];
    className?: string;
};

const MessageList: React.FC<Properties> = ({ messages, className }) => {
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
        </Grid>
    );
};

export { MessageList };
