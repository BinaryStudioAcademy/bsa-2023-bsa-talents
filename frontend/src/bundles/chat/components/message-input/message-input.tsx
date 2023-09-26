import { IconButton, Input as MuiInput, InputAdornment } from '@mui/material';

import sendIcon from '~/assets/img/send-message.svg';
import { actions as chatActions } from '~/bundles/chat/store/chat.js';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { MAX_MESSAGE_LENGTH, ZERO_INDEX } from '../../constants/constants.js';
import { INPUT } from './constants.js';
import styles from './styles.module.scss';

type Properties = {
    className?: string;
};

const MessageInput: React.FC<Properties> = ({ className }) => {
    const { user, chats, currentChatId } = useAppSelector(({ auth, chat }) => ({
        user: auth.currentUser,
        chats: chat.chats,
        currentChatId: chat.current.chatId,
    }));

    const dispatch = useAppDispatch();

    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isShiftDown, setIsShiftDown] = useState(false);

    const sendMessage = useCallback((): void => {
        if (message.trim()) {
            const chat = chats.find((chat) => chat.chatId === currentChatId);
            if (chat) {
                const { receiver, sender } = chat.participants;
                const messageRecipient =
                    sender.id === user?.id ? receiver.id : sender.id;

                const payload = {
                    message,
                    chatId: currentChatId as string,
                    senderId: user?.id as string,
                    receiverId: messageRecipient,
                };
                void dispatch(chatActions.createMessage(payload));
            }
            setMessage('');
        }
    }, [message, chats, currentChatId, dispatch, user?.id]);

    const handleInputChange = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ): void => {
            const text =
                event.target.value.length > MAX_MESSAGE_LENGTH
                    ? event.target.value.slice(ZERO_INDEX, MAX_MESSAGE_LENGTH)
                    : event.target.value;
            setMessage(text);
        },
        [],
    );

    const handleSendClick = useCallback(() => {
        sendMessage();
    }, [sendMessage]);

    const handleKeyDown = useCallback(
        (
            event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            if (event.key === 'Shift') {
                setIsShiftDown(true);
            }
            if (event.key === 'Enter' && !isShiftDown) {
                event.preventDefault();
                sendMessage();
            }
        },
        [isShiftDown, sendMessage],
    );

    const handleKeyUp = useCallback(
        (
            event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => {
            if (event.key === 'Shift') {
                setIsShiftDown(false);
            }
            if (event.key === 'Enter' && !isShiftDown) {
                setMessage('');
            }
        },
        [isShiftDown],
    );

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, [setIsFocused]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, [setIsFocused]);

    const inputStyles = getValidClassNames(
        styles.input,
        isFocused && styles.focused,
    );

    return (
        <Grid className={getValidClassNames(styles.wrapper, className)}>
            <MuiInput
                value={message}
                name="message"
                type="text"
                placeholder="Type a message"
                multiline={true}
                minRows={INPUT.minRows}
                maxRows={INPUT.maxRows}
                className={inputStyles}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                disableUnderline={true}
                endAdornment={
                    <InputAdornment position="end" className={styles.adornment}>
                        <IconButton
                            aria-label="send message"
                            onClick={handleSendClick}
                            edge="end"
                        >
                            <img src={sendIcon} alt="send" />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </Grid>
    );
};

export { MessageInput };
