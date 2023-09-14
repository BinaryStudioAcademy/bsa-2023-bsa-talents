import { IconButton, Input as MuiInput, InputAdornment } from '@mui/material';

import sendIcon from '~/assets/img/send-message.svg';
import { Grid } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { MAX_MESSAGE_LENGTH } from '../../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSend?: (message: string) => void;
    className?: string;
};

const MessageInput: React.FC<Properties> = ({ onSend, className }) => {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isShiftDown, setIsShiftDown] = useState(false);

    const sendMessage = useCallback((): void => {
        if (onSend && message.trim()) {
            onSend(message.trim());
            setMessage('');
        }
    }, [message, onSend]);

    const handleInputChange = useCallback(
        (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ): void => {
            const text =
                event.target.value.length > MAX_MESSAGE_LENGTH
                    ? event.target.value.slice(0, MAX_MESSAGE_LENGTH)
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
                minRows={1}
                maxRows={3}
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
