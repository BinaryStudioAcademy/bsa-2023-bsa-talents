import {
    ChatHeader,
    ChatList,
    MessageInput,
    MessageList,
} from '~/bundles/chat/components/components.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';

import { items, messages } from '../../mock-data/mock-data.js';
import styles from './styles.module.scss';

const ChatsPage: React.FC = () => {
    return (
        <Grid container direction="column">
            <Typography variant="h4" className={styles.header}>
                Chats
            </Typography>
            <Grid container wrap="nowrap" className={styles.chatWrapper}>
                <Grid className={styles.chatList}>
                    <ChatList chatItems={items} />
                </Grid>
                <Grid container flexGrow={1} direction="column">
                    <ChatHeader
                        title="hello"
                        isOnline
                        className={styles.chatHeader}
                    />
                    <MessageList
                        messages={messages}
                        className={styles.messageList}
                    />
                    <MessageInput className={styles.chatInput} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { ChatsPage };
